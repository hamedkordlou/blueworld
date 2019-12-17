namespace Backend.OutboundResources
{
    public class Marker
    {
        public string Id { get; set; } // ==> Uid in Model.Marker
        public double Lat { get; set; }
        public double Lng { get; set; }
        public string Text { get; set; }
    }
}