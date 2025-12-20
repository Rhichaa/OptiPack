namespace OptiPackBackend.Models
{
    public class UserSettings
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? Theme { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}

