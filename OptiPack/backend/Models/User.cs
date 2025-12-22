using System;
using System.ComponentModel.DataAnnotations;

namespace OptiPackBackend.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string FullName { get; set; } = "";

        [Required]
        public string Email { get; set; } = "";

        [Required]
        public string Password { get; set; } = "";

        public string Phone { get; set; } = "";

        // New fields for the Settings page
        public bool NotificationsEnabled { get; set; } = true;
        public string PreferredTheme { get; set; } = "system";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastLogin { get; set; } // Nullable if they haven't logged in yet
    }
}