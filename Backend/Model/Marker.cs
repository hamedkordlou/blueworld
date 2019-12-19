namespace Backend.Model
{
    public class Marker
    {
        public int Id { get; set; }
        public string Uid { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public string Text { get; set; }
        public View View { get; set; }
        public SharedView SharedView { get; set; }
    }
}