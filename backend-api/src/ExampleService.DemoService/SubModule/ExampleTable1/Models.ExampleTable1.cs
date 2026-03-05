using System.ComponentModel.DataAnnotations;

namespace ToptechCmmUniversalBackendApi.ExampleService.DemoService.ExampleTable1.Models;

// ===== Request DTOs =====

public class CreateExampleTable1Request
{
    [Required(ErrorMessage = "ExampleTable1Name is required")]
    [MaxLength(200, ErrorMessage = "ExampleTable1Name cannot exceed 200 characters")]
    public string ExampleTable1Name { get; set; } = string.Empty;

    [MaxLength(500, ErrorMessage = "ExampleTable1Description cannot exceed 500 characters")]
    public string? ExampleTable1Description { get; set; }

    [MaxLength(20, ErrorMessage = "Status cannot exceed 20 characters")]
    public string Status { get; set; } = "active";
}

public class UpdateExampleTable1Request
{
    [Required(ErrorMessage = "ExampleTable1Name is required")]
    [MaxLength(200, ErrorMessage = "ExampleTable1Name cannot exceed 200 characters")]
    public string ExampleTable1Name { get; set; } = string.Empty;

    [MaxLength(500, ErrorMessage = "ExampleTable1Description cannot exceed 500 characters")]
    public string? ExampleTable1Description { get; set; }

    [MaxLength(20, ErrorMessage = "Status cannot exceed 20 characters")]
    public string Status { get; set; } = "active";
}

public class PatchExampleTable1Request
{
    [MaxLength(200, ErrorMessage = "ExampleTable1Name cannot exceed 200 characters")]
    public string? ExampleTable1Name { get; set; }

    [MaxLength(500, ErrorMessage = "ExampleTable1Description cannot exceed 500 characters")]
    public string? ExampleTable1Description { get; set; }

    [MaxLength(20, ErrorMessage = "Status cannot exceed 20 characters")]
    public string? Status { get; set; }
}

// ===== Response DTOs =====

public class ExampleTable1Response
{
    public Guid ExampleTable1Id { get; set; }
    public string ExampleTable1Name { get; set; } = string.Empty;
    public string? ExampleTable1Description { get; set; }
    public string Status { get; set; } = "active";
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

// ===== Common Response Models =====

public class ExampleTable1ApiResponse<T>
{
    public bool Success { get; set; }
    public T? Data { get; set; }
    public ExampleTable1ErrorInfo? Error { get; set; }
    public ExampleTable1MetaData Meta { get; set; } = new();
    public PaginationInfo? Pagination { get; set; }
}

public class ExampleTable1ErrorInfo
{
    public string Code { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public object? Details { get; set; }
    public string? Field { get; set; }
}

public class ExampleTable1MetaData
{
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    public string Version { get; set; } = "v1";
    public string? RequestId { get; set; }
}

public class PaginationInfo
{
    public int Page { get; set; }
    public int Limit { get; set; }
    public int Total { get; set; }
    public int TotalPages { get; set; }
    public bool HasNext { get; set; }
    public bool HasPrev { get; set; }
}

// ===== Query Parameters =====

public class GetExampleTable1ListQuery
{
    public string? Status { get; set; }
    public string? SearchName { get; set; }
    public string? SortBy { get; set; } = "exampletable1_id";
    public string? SortOrder { get; set; } = "asc";
    public int Page { get; set; } = 1;
    public int Limit { get; set; } = 20;
}
