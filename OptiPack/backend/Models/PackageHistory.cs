public class PackageHistory
{
    public int Id { get; set; }
    public DateTime PackedAt { get; set; } = DateTime.UtcNow;
    public string ProductName { get; set; } = "";
    public int ProductId { get; set; }
    public string BoxUsed { get; set; } = "";
    public string ProtectiveMaterials { get; set; } = ""; 
    public decimal Cost { get; set; }
    public string AiUsed { get; set; } = "Yes"; 

    // USE STRINGS HERE TO MATCH THE "kg" and "cm" TEXT FROM FRONTEND
    public string Weight { get; set; } = ""; 
    public string Dimensions { get; set; } = "";
}