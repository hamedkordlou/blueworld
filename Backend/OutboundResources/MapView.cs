using System.Collections.Generic;

namespace Backend.OutboundResources
{
    public class MapView
    {
        public string UserName { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public int Zoom { get; set; }
        public IEnumerable<Marker> Markers { get; set; }

        public MapView()
        {
            Markers = new List<Marker>();
        }
    }
}