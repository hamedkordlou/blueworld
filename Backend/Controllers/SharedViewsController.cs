using System.Collections.Generic;
using Backend.OutboundResources;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SharedViewsController : ControllerBase
    {
        // GET api/sharedviews/{username}
        [HttpGet("{username}")]
        public ActionResult Get(string username)
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
            return Ok(new List<SharedView>(){temp1, temp2});
        }

    }
}