import asyncio
import sys
import json
import glob
import os
from os.path import join
from urllib.request import urlopen
from websockets.server import serve, WebSocketServerProtocol
import websockets.exceptions as ws_excption

from Sheets import Sheets


URL = "localhost"
PORT = 8000

SHEETS = Sheets()
PATH = '/home/bubbazz/Documents/work/Website/sheets/src/websocket/python/'


class myJson:
    def __init__(self, type: str, data) -> None:
        self.type = type
        self.data = data


class jsonFile():
    def __init__(self, name, data) -> None:
        self.name = name
        with urlopen(data) as file:
            self.data = file.read()
        pass


class jsonObject():
    def __init__(self, name, data) -> None:
        self.name = name
        self.data = data


def write(data: jsonFile):
    with open(data.name, "bw") as file:
        file.write(data.data)


async def init_send(websocket: WebSocketServerProtocol):
    header = json.dumps(
        {"type": "excon_lst", "data": list(SHEETS.ExconHeader())})
    await websocket.send(header)
    onlyfiles = [os.path.basename(i) for i in glob.glob(PATH+"*.json")]
    header = json.dumps(
        {"type": "open_lst", "data": list(onlyfiles)})
    await websocket.send(header)


async def handler(websocket: WebSocketServerProtocol, path):
    print(f"Websocket for client {websocket.id} started")
    await init_send(websocket)
    try:
        while not websocket.closed:
            message = await websocket.recv()
            mjson = myJson(**json.loads(message))
            if (mjson.type == "file"):
                mjson.data = jsonFile(**mjson.data)
                write(mjson.data)
                y = SHEETS.Header(PATH+mjson.data.name)
                ddf = SHEETS.frame(PATH+mjson.data.name)
                await websocket.send(json.dumps({"type": "mandant_lst", "data": list(y)}))
            if (mjson.type == "save"):
                mjson.data = jsonObject(**mjson.data)
                with open(PATH+mjson.data.name, "w") as file:
                    json.dump(mjson.data.data, file)
                    onlyfiles = [os.path.basename(i)
                                 for i in glob.glob(PATH+"*.json")]
                    header = json.dumps(
                        {"type": "open_lst", "data": list(onlyfiles)})
                    await websocket.send(header)
                print("sheetobject ist written")
            if (mjson.type == "open"):
                with open(PATH+mjson.data, "r") as file:
                    y = json.load(file)
                    await websocket.send(json.dumps({"type": "open", "data": y}))
                print("sheetobject ist read")
            if mjson.type == "create":
                df = SHEETS.ExconHeader()
                SHEETS.fillExcon(dfc=df, df=ddf, lst=mjson.data)
                SHEETS.writeHTML(df)
    except ws_excption.ConnectionClosed:
        print(f"Websocket closed for client: {websocket.id}")
    print(f"Websocket closed for client : {websocket.id}")
    return
if len(sys.argv) > 1:
    PATH = str(sys.argv[1])
print(f"path is {PATH}")
websocketcall = serve(handler, URL, PORT)
asyncio.get_event_loop().run_until_complete(websocketcall)
asyncio.get_event_loop().run_forever()
