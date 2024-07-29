using Microsoft.AspNetCore.Mvc;
using AltayStok.Server.Models;
using Microsoft.EntityFrameworkCore;
using StockManagementAPI.Models;
using System.Threading.Tasks;

namespace StockManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly StokV8Context _context;

        public StockController(StokV8Context context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Urunler>>> GetProducts()
        {
            return await _context.Urunler.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Urunler>> GetProduct(int id)
        {
            var urun = await _context.Urunler.FindAsync(id);

            if (urun == null)
            {
                return NotFound();
            }

            return urun;
        }

        [HttpPost]
        public async Task<ActionResult<Urunler>> PostProduct(Urunler urun)
        {
            _context.Urunler.Add(urun);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProduct), new { id = urun.UrunId }, urun);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Urunler urun)
        {
            if (id != urun.UrunId)
            {
                return BadRequest();
            }

            _context.Entry(urun).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var urun = await _context.Urunler.FindAsync(id);
            if (urun == null)
            {
                return NotFound();
            }

            _context.Urunler.Remove(urun);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Urunler.Any(e => e.UrunId == id);
        }
    }
}
