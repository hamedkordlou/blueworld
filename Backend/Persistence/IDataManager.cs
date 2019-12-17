using System.Collections.Generic;
using Backend.OutboundResources;

namespace Backend.Persistence
{
    public interface IDataManager
    {
        IList<SharedView> GetSharedViews(string username);
        MapView GetView(string username);
        void UpdateView(MapView view);
        void ShareMapView(SharedView view);
        void CreateMarker(string userName, Marker marker);
        void UpdateMarker(string id, Marker marker);
    }
}