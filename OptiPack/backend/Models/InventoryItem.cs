namespace OptiPackBackend.Models
{
    public class InventoryItem
    {
        public int Id { get; set; }
        public int? BoxId { get; set; }
        public Box? Box { get; set; }
        public int? MaterialId { get; set; }
        public ProtectiveMaterial? Material { get; set; }
        public int Quantity { get; set; } // number of boxes or units
    }
}
