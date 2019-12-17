using Backend.OutboundResources;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class MarkersController : ControllerBase
    {
        // POST api/markers/{username}
        [HttpPost("{userName}")]
        public void Post(string userName, [FromBody] Marker marker)
        {
            return;
        }

        // PUT api/markers/1
        [HttpPut("{id}")]
        public void Put(string id, [FromBody] Marker value)
        {
            return;
        }
    }
}