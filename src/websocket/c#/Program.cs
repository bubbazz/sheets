using System;
using System.IO;
using Fleck;

using System.Text.Json;

namespace App
{

  class MyJson<T>
  {
    public MyJson(string type, T data)
    {
      this.type = type;
      this.data = data;
    }
    public string type { get; set; }
    public T data { get; set; }
  }
  class Program
  {
    static void Main(string[] args)
    {
      string url = "ws://0.0.0.0:8000";
      var websocket = new WebSocketServer(url);
      var sheets = new Sheets();
      websocket.Start(config =>
     {
       config.OnOpen = () =>
       {
         Console.WriteLine("Conntection Started");
         Console.WriteLine($"Connection Infos:\n{config.ConnectionInfo}");
         var myJson = new MyJson<string[]>("excon_lst", sheets.ExconHead);
         var jsonExconHead = JsonSerializer.Serialize(myJson);
         config.Send(jsonExconHead);
       };
       config.OnClose = () => Console.WriteLine("Connection Closed");
       config.OnMessage = mes =>
       {
         //todo Errorhandling
         var jsonDoc = JsonDocument.Parse(mes);
         string typeVal = jsonDoc.RootElement.GetProperty("type").GetString();
         switch (typeVal)
         {
           case "file":
             JsonSerializer.Deserialize<MyJson<File>>(mes);
             break;
         }
         var jsonMes = JsonSerializer.Deserialize(mes, MyJson<string>);
         Console.WriteLine(jsonMes);
       };
     }
      );
      while (true)
      {
        var input = Console.ReadLine();
        if (input.Contains("close"))
          break;
      }
    }
  }
}
