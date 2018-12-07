"""
api.py
- provides the API endpoints for consuming and producing
  REST requests and responses
"""

from flask import request
from flask_restful import Resource
from datetime import datetime, timedelta

import json
import requests

# Free API limits - 5 requests per minute and 500 per day
AV_API_URL = "https://www.alphavantage.co/query?apikey=9G4G4R3GA5E5ENSZ&"

# Data store init state
store = {
    'cash_value': 0,
    'portfolio': {
        'VFINX': {
            # 'name': 'Vanguard 500 Index Fund Investor Shares',
            'quantity': 0,
            'price': None,
        },
        'NAESX': {
            # 'name': 'Vanguard Small Capitalization Index Fund Investor Shares',
            'quantity': 0,
            'price': None,
        },
        'VGTSX': {
            # 'name': 'Vanguard Total International Stock Index Fund Investor Shares',
            'quantity': 0,
            'price': None,
        },
        'VBMFX': {
            # 'name': 'Vanguard Total Bond Market Index Fund Investor Shares',
            'quantity': 0,
            'price': None,
        }
    },
    'last_updated': {  # when was the price last updated from Alpha Vantage
        'VFINX': None,
        'NAESX': None,
        'VGTSX': None,
        'VBMFX': None,
    },
}


class Cash(Resource):
    def get(self):
        # Default to 200 OK
        return {'cashValue': store['cash_value']}

    def post(self):
        data = request.get_json()
        transfer_amount = float(data['transferAmount'])

        if store['cash_value'] + transfer_amount < 0:
            return {}, 403  # Forbidden
        else:
            store['cash_value'] += transfer_amount
            return {}, 200


class Portfolio(Resource):
    def get(self):
        status_code = 200
        for symbol in store['portfolio']:
            stock = store['portfolio'][symbol]
            # Only update from Alpha Vantage for first time or max once every 5 minutes
            if store['last_updated'][symbol] == None or datetime.now() - store['last_updated'][symbol] > timedelta(seconds=5*60):
                response = requests.get(
                    AV_API_URL + 'function=GLOBAL_QUOTE&symbol=' + symbol)
                try:
                    # This works because stock is just a pointer
                    stock['price'] = float(
                        response.json()["Global Quote"]["05. price"])
                    store['last_updated'][symbol] = datetime.now()
                except:
                    status_code = 429  # Too Many Requests

        return {'portfolio': store['portfolio']}, status_code


class Stock(Resource):
    def post(self, symbol):
        stock = store['portfolio'][symbol]
        data = request.get_json()
        transfer_amount = int(data['transferAmount'])

        if stock['quantity'] + transfer_amount < 0:
            return {}, 403  # Forbidden
        elif transfer_amount * stock['price'] > store['cash_value']:
            # Make sure they have enough money
            return {}, 403
        else:
            stock['quantity'] += transfer_amount
            store['cash_value'] -= transfer_amount * stock['price']
            return {}, 200
