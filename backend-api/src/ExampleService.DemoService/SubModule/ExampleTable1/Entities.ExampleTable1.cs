using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ToptechCmmUniversalBackendApi.ExampleService.DemoService.ExampleTable1.Entities;

[Table("ExampleTable1", Schema = "tt_cmm_universal_db")]
public class ExampleTable1Entity
{
    [Key]
    [Column("exampletable1_id")]
    public Guid ExampleTable1Id { get; set; }

    [Required]
    [MaxLength(200)]
    [Column("exampletable1_name")]
    public string ExampleTable1Name { get; set; } = string.Empty;

    [MaxLength(500)]
    [Column("exampletable1_description")]
    public string? ExampleTable1Description { get; set; }

    [Required]
    [MaxLength(20)]
    [Column("Status")]
    public string Status { get; set; } = "active";

    [Required]
    [Column("CreatedAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [Required]
    [Column("UpdatedAt")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
