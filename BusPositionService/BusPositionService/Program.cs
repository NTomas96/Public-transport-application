using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net;

namespace BusPositionService
{
    class Program
    {
        public static List<LineObj> lines = new List<LineObj>();

        static void Main(string[] args)
        {
            importLines();            

            while (true)
            {                
                foreach (LineObj l in lines)
                {
                    foreach (Bus b in l.Buses)
                    {
                        b.calculateBusLocation(l.Waypoints, l.LineRoute);

                        BusJson bj = new BusJson(b.TrackerSerial,b.BusLocation);

                        string parameters = JsonConvert.SerializeObject(bj);

                        HttpPost("http://localhost:56014/api/Lines/Bus", parameters);
                    }
                }

                Thread.Sleep(2000);
            }
        }

        private static Random rnd = new Random();

        public static void importLines()
        {
            using (StreamReader r = new StreamReader("lines.json"))
            {
                string json = r.ReadToEnd();
                lines = JsonConvert.DeserializeObject<List<LineObj>>(json);

                //setup lines, starting bus locations
                foreach (LineObj l in lines)
                {
                    if(l.Waypoints.First().Equals(l.Waypoints.Last()))
                    {
                        l.LineRoute = true;
                    }
                    else
                    {
                        l.LineRoute = false;
                    }

                    for(int i=0;i<1;i++)
                    {
                        Bus bus = new Bus();
                        bus.TrackerSerial = "SN_Line" + l.Name + "_BusNO:" + i;


                        int index = rnd.Next(0, l.Waypoints.Count);
                        bus.Index = index;

                        l.Buses.Add(bus);
                    }

                    break;
                }

                /*
                Console.WriteLine(lines[0].BusLocation.Lon);

                Waypoint[] niz = lines[0].Waypoints.ToArray();

                Console.WriteLine(niz[0].Lat + " " + niz[0].Lon);

                Console.ReadLine();
                */
            }
        }

        public static string HttpPost(string URI, string Parameters)
        {
            WebRequest req = WebRequest.Create(URI);

            //Add these, as we're doing a POST
            req.ContentType = "application/json";
            req.Method = "POST";

            //We need to count how many bytes we're sending. Post'ed Faked Forms should be name=value&
            byte[] bytes = Encoding.ASCII.GetBytes(Parameters);
            req.ContentLength = bytes.Length;
            Stream os = req.GetRequestStream();

            os.Write(bytes, 0, bytes.Length); //Push it out there
            os.Close();

            WebResponse resp = req.GetResponse();
            if (resp == null) return null;
            StreamReader sr = new StreamReader(resp.GetResponseStream());
            return sr.ReadToEnd().Trim();
        }
    }
}
