namespace OptiPackBackend.Models
{
    public class ProtectiveMaterial
    {
        public int Id { get; set; }
        public string Name { get; set; } = ""; // Bubble Wrap, Foam, Thermocol
        public string Unit { get; set; } = "meter"; // meter, sheet, piece
        public decimal UnitCost { get; set; }
        public int StockUnits { get; set; } // amount in unit
    }
}
