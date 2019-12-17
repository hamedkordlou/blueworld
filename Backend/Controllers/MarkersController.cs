using Backend.OutboundResources;
using Backend.Persistence;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class MarkersController : ControllerBase
    {
        private readonly IDataManager _dataManager;
        public MarkersController(IDataManager dataManager)
        {
            this._dataManager = dataManager;
        }
        
        // POST api/markers/{username}
        [HttpPost("{userName}")]
        public void Post(string userName, [FromBody] Marker marker)
        {
            _dataManager.CreateMarker(userName, marker);
        }

        // PUT api/markers/1
        [HttpPut("{id}")]
        public void Put(string id, [FromBody] Marker marker)
        {
            _dataManager.UpdateMarker(id, marker);
        }
    }
}