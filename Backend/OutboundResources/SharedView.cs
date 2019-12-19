using System.Collections.Generic;

namespace Backend.OutboundResources
{
    public class SharedView
    {
        public string Id { get; set; }
        public string Sender { get; set; }
        public string Reciever { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public int Zoom { get; set; }
        public ICollection<Marker> Markers { get; set; }

        public SharedView()
        {
            Markers = new List<Marker>();
        }
    }
}