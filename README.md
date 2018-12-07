# Bonsai

A stock trading web app designed for beginners. Built for an interview coding task. The app is composed of a [VueJS](https://vuejs.org/) single page application frontend and a [Flask](http://flask.pocoo.org/) backend REST API.

## Online demo

Coming soon!

## Getting started

Instructions for setup and running on your local machine.

You need to have [npm](https://www.npmjs.com/get-npm) and [Python 3](https://www.python.org/downloads/) installed.

```bash
# clone the project
git clone https://github.com/viv-li/bonsai
```

### Frontend

Navigate to `frontend/bonsai-app/`

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run serve

# build for production with minification
npm run build
```

### Backend

In a new tab, navigate to `backend`, and make sure you have Python 3 running.

```bash
# check which version of Python
python --version
```

If you're not running Python 3, you can [use a virtualenv](https://www.twilio.com/docs/usage/tutorials/how-to-set-up-your-python-and-flask-development-environment#start-a-new-project-with-virtualenv).

```bash
# Follow instructions above to activate virtualenv is you need to

# install dependencies
pip install -r requirements.txt

# serve at localhost:5000
python manage.py runserver
```
