using System.Collections.Generic;
using Backend.OutboundResources;

namespace Backend.Persistence
{
    public class MockDataManager : IDataManager
    {
        public void CreateMarker(string userName, Marker marker)
        {
            throw new System.NotImplementedException();
        }

        public IList<SharedView> GetSharedViews(string username)
        {
            var temp1 = new SharedView()
            {
                Id = "1",
                Sender = "ali",
                Reciever = "hamed",
                Lat = 51.505,
                Lng = -0.09,
                Zoom = 12,
                Markers = new List<Marker>()
                {
                    new Marker()
                    {
                        Id = "1",
                        Lat = 51.505,
                        Lng = -0.09,
                        Text = "first destination"
                    },
                    new Marker()
                    {
                        Id = "2",
                        Lat = 51.555,
                        Lng = -0.08,
                        Text = "second destination"
                    },
                    new Marker()
                    {
                        Id = "3",
                        Lat = 51.465,
                        Lng = -0.12,
                        Text = "third destination"
                    }
                }
            };
            var temp2 = new SharedView()
            {
                Id = "22",
                Sender = "vali",
                Reciever = "hamed",
                Lat = 51.505,
                Lng = -0.09,
                Zoom = 12,
                Markers = new List<Marker>()
                {
                    new Marker()
                    {
                        Id = "1",
                        Lat = 51.505,
                        Lng = -0.09,
                        Text = "first destination"
                    },
                    new Marker()
                    {
                        Id = "2",
                        Lat = 51.555,
                        Lng = -0.08,
                        Text = "second destination"
                    }
                }
            };

            return new List<SharedView>() { temp1, temp2 };
        }

        public MapView GetView(string username)
        {
            var temp = new MapView()
            {
                Lat = 51.505,
                Lng = -0.09,
                Zoom = 12,
                Markers = new List<Marker>()
                {
                    new Marker()
                    {
                        Id = "1",
                        Lat = 51.505,
                        Lng = -0.09,
                        Text = "first destination"
                    },
                    new Marker()
                    {
                        Id = "2",
                        Lat = 51.555,
                        Lng = -0.08,
                        Text = "second destination"
                    },
                    new Marker()
                    {
                        Id = "3",
                        Lat = 51.465,
                        Lng = -0.12,
                        Text = "third destination"
                    }
                }
            };

            return temp;
        }

        public void ShareMapView(SharedView view)
        {
            throw new System.NotImplementedException();
        }

        public void UpdateMarker(string id, Marker marker)
        {
            throw new System.NotImplementedException();
        }

        public void UpdateView(MapView view)
        {
            throw new System.NotImplementedException();
        }
    }
}