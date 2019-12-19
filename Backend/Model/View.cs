using System.Collections.Generic;

namespace Backend.Model
{
    public class View
    {
        public int Id { get; set; }
        public string Uid { get; set; }
        public string UserName { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public int Zoom { get; set; }
        public ICollection<Marker> Markers { get; set; }

        public View()
        {
            Markers = new List<Marker>();
        }
    }
}