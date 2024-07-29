namespace AltayStok.Server.Models
{
    public partial class Urunler
    {
        public int UrunId { get; set; }
        public string UrunAdi { get; set; } = string.Empty;
        public string UrunKodu { get; set; } = string.Empty;
        public string Kategori { get; set; } = string.Empty;
    }
}
