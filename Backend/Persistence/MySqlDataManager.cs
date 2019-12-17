using System.Collections.Generic;
using System.Linq;
using Backend.OutboundResources;
using Backend.Persistence.Context;

namespace Backend.Persistence {
    public class MySqlDataManager : IDataManager {
        private readonly MySqlDbContext _context;
        public MySqlDataManager () {
            this._context = new MySqlDbContext();
        }

        public void CreateMarker (string userName, Marker marker) {
            var _marker = new Model.Marker()
            {
                Lat = marker.Lat,
                Lng = marker.Lng,
                Text = marker.Text,
                Uid = marker.Id
            };
            
            _context.Markers.Add(_marker);
            var view = _context.Views.Where(x => x.UserName == userName).FirstOrDefault();
            if(view != null)
            {
                view.Markers.Append(_marker);
            }
            _context.SaveChanges();
        }

        public IList<SharedView> GetSharedViews (string username) {
            var sharedViews = _context.SharedViews.Where(x => x.Reciever == username).ToList();
            var result = new List<SharedView>();
            sharedViews.ForEach(x => {
                result.Add(new OutboundResources.SharedView(){
                    Id = x.Id.ToString(),
                    Lat = x.Lat,
                    Lng = x.Lng,
                    Reciever = username,
                    Sender = x.Sender,
                    //Markers = x.Markers
                });
            });

            return result;
        }

        public MapView GetView (string username) {
            throw new System.NotImplementedException ();
        }

        public void ShareMapView (SharedView view) {
            throw new System.NotImplementedException ();
        }

        public void UpdateMarker (string id, Marker marker) {
            throw new System.NotImplementedException ();
        }

        public void UpdateView (MapView view) {
            throw new System.NotImplementedException ();
        }
    }
}