using System;
using System.Collections.Generic;
using System.Linq;
using Backend.OutboundResources;
using Backend.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace Backend.Persistence 
{
    public class MySqlDataManager : IDataManager 
    {
        private readonly MySqlDbContext _context;
        public MySqlDataManager () 
        {
            this._context = new MySqlDbContext();
        }

        public void CreateMarker (string userName, Marker marker) 
        {
            var _marker = new Model.Marker()
            {
                Lat = marker.Lat,
                Lng = marker.Lng,
                Text = marker.Text,
                Uid = marker.Id
            };
            
            _context.Markers.Add(_marker);
            _context.SaveChanges();

            var view = _context.Views.FirstOrDefault(x => x.UserName == userName);
            if(view != null)
            {
                // view.Include(v => v.Markers);
                view.Markers.Add(_marker);
            }
            _context.Views.Update(view);
            _context.SaveChanges();
        }

        public IList<SharedView> GetSharedViews (string username) 
        {
            var sharedViews = _context.SharedViews
                                    .Include(x => x.Markers)
                                    .Where(x => x.Reciever == username)
                                    // .Include(x => x.Markers)
                                    .ToList();
            var result = new List<SharedView>();
            sharedViews.ForEach(x => {
                var tempMarkerList = new List<Marker>();
                foreach(var m in x.Markers)
                {
                    var temp = new Backend.OutboundResources.Marker()
                    {
                        Id = m.Uid,
                        Lat = m.Lat,
                        Lng = m.Lng,
                        Text = m.Text
                    };
                    tempMarkerList.Add(temp);
                }
                result.Add(new OutboundResources.SharedView(){
                    Id = x.Id.ToString(),
                    Lat = x.Lat,
                    Lng = x.Lng,
                    Zoom = x.Zoom,
                    Reciever = username,
                    Sender = x.Sender,
                    Markers = tempMarkerList
                });
            });

            return result;
        }

        public MapView GetView (string username) 
        {
            var view = _context.Views
                                .Include(x => x.Markers)
                                .FirstOrDefault(x => x.UserName == username);
            if(view == null)
                return GetDefaultView(username);
            var tempMarkerList = new List<Marker>();
            foreach(var m in view.Markers)
            {
                var temp = new Backend.OutboundResources.Marker()
                {
                    Id = m.Uid,
                    Lat = m.Lat,
                    Lng = m.Lng,
                    Text = m.Text
                };
                tempMarkerList.Add(temp);
            }
            var result = new MapView()
            {
                Lat = view.Lat,
                Lng = view.Lng,
                Zoom = view.Zoom,
                Markers = tempMarkerList
            };

            return result;
        }

        private MapView GetDefaultView(string username)
        {
            var view = new MapView()
            {
                Lat = 51.505,
                Lng = -0.09,
                Zoom = 12,
                UserName = username,
                Markers = new List<Marker>()
            };

            return view;
        }

        public void ShareMapView (SharedView view) 
        {
            // map OutboundResource.SharedView to Model.SharedView
            var sharedView = new Model.SharedView()
            {
                Lat = view.Lat,
                Lng = view.Lng,
                Zoom = view.Zoom,
                Sender = view.Sender,
                Reciever = view.Reciever,
                Markers = view.Markers
                            .Select(x => new Model.Marker
                            {
                                Lat = x.Lat,
                                Lng = x.Lng,
                                Text = x.Text
                            }).ToList()
            };

            _context.SharedViews.Add(sharedView);
            _context.SaveChanges();
        }

        public void UpdateMarker (string id, Marker marker) 
        {
            var tempMarker = _context.Markers.FirstOrDefault(x => x.Uid == id);
            if(tempMarker == null) return;

            tempMarker.Lng = marker.Lat;
            tempMarker.Lng = marker.Lng;
            tempMarker.Text = marker.Text;

            _context.Markers.Update(tempMarker);
            _context.SaveChanges();
        }

        public void UpdateView (MapView view) 
        {
            var tempView = _context.Views.FirstOrDefault(x => x.UserName == view.UserName);
            if(tempView == null)
            {
                tempView = new Model.View();
                tempView.UserName = view.UserName;
            }
            tempView.Lat = view.Lat;
            tempView.Lng = view.Lng;
            tempView.Zoom = view.Zoom;

            _context.Views.Update(tempView);
            _context.SaveChanges();
        }
    }
}