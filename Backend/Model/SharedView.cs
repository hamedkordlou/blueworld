using System.Collections.Generic;

namespace Backend.Model
{
    public class SharedView
    {
        public int Id { get; set; }
        public string Sender { get; set; }
        public string Reciever { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public int Zoom { get; set; }
        public IEnumerable<Marker> Markers { get; set; }

        public SharedView()
        {
            Markers = new List<Marker>();
        }
    }
}