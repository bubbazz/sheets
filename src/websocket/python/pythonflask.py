import re
from flask import Flask, request
from flask.json import jsonify
import sqlite3


def app_init():
    con = sqlite3.connect("example.db")
    try:
        cur = con.cursor()
        cur.execute(
            '''CREATE TABLE sheets (
	        id INTEGER PRIMARY KEY,
	        text TEXT NOT NULL
);''')
        cur.execute("insert into sheets values (1, 'test')")
        cur.execute("insert into sheets values (2, 'yo')")
        con.commit()
    except:
        print("yolo")
    con.close()
    return Flask(__name__)


app = app_init()

jsony = {"1": 1, "zwei": "text"}


@ app.route('/', methods=['GET', 'PUT'])
def hello():
    con = sqlite3.connect("example.db")
    cur = con.cursor()
    if request.method == 'GET':
        jsony = cur.execute('SELECT * FROM sheets').fetchall()
        print(jsony)
        return jsonify(jsony)
    if request.method == 'PUT':
        cur.execute("insert into lang values (?, ?)",
                    (request.args['key'], request.args['val']))
        con.commit()
        JSON = jsonify(cur.execute('SELECT * FROM sheets'))
        return JSON
