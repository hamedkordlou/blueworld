using Microsoft.AspNetCore.Mvc;
using Backend.OutboundResources;
using System.Collections.Generic;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ViewsController : ControllerBase
    {

        // GET api/views/{username}
        [HttpGet("{username}")]
        public IActionResult Get(string username)
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
            return Ok(temp);
        }

        // POST api/views
        [HttpPost]
        public void Post([FromBody] MapView value)
        {
            return;
        }

        // POST api/views/sharemapview
        [HttpPost("sharemapview")]
        public void ShareMapView([FromBody] SharedView value)
        {
            return;
        }

    }
}