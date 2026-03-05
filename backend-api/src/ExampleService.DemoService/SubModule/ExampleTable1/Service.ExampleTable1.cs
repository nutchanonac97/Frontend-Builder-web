using ToptechCmmUniversalBackendApi.ExampleService.DemoService.ExampleTable1.Entities;
using ToptechCmmUniversalBackendApi.ExampleService.DemoService.ExampleTable1.Models;
using ToptechCmmUniversalBackendApi.ExampleService.DemoService.ExampleTable1.Repositories;

namespace ToptechCmmUniversalBackendApi.ExampleService.DemoService.ExampleTable1.Services;

public interface IExampleTable1Service
{
    Task<ExampleTable1ApiResponse<List<ExampleTable1Response>>> GetAllAsync(GetExampleTable1ListQuery query);
    Task<ExampleTable1ApiResponse<ExampleTable1Response>> GetByIdAsync(Guid id);
    Task<ExampleTable1ApiResponse<ExampleTable1Response>> CreateAsync(CreateExampleTable1Request request);
    Task<ExampleTable1ApiResponse<ExampleTable1Response>> UpdateAsync(Guid id, UpdateExampleTable1Request request);
    Task<ExampleTable1ApiResponse<ExampleTable1Response>> PatchAsync(Guid id, PatchExampleTable1Request request);
    Task<ExampleTable1ApiResponse<bool>> DeleteAsync(Guid id);
}

public class ExampleTable1Service : IExampleTable1Service
{
    private readonly IExampleTable1Repository _repository;
    private readonly ILogger<ExampleTable1Service> _logger;

    public ExampleTable1Service(
        IExampleTable1Repository repository,
        ILogger<ExampleTable1Service> logger)
    {
        _repository = repository;
        _logger = logger;
    }

    public async Task<ExampleTable1ApiResponse<List<ExampleTable1Response>>> GetAllAsync(GetExampleTable1ListQuery query)
    {
        try
        {
            var (items, total) = await _repository.GetAllAsync(query);

            var responses = items.Select(MapToResponse).ToList();

            var totalPages = (int)Math.Ceiling(total / (double)query.Limit);

            return new ExampleTable1ApiResponse<List<ExampleTable1Response>>
            {
                Success = true,
                Data = responses,
                Meta = new ExampleTable1MetaData
                {
                    Timestamp = DateTime.UtcNow,
                    Version = "v1"
                },
                Pagination = new PaginationInfo
                {
                    Page = query.Page,
                    Limit = query.Limit,
                    Total = total,
                    TotalPages = totalPages,
                    HasNext = query.Page < totalPages,
                    HasPrev = query.Page > 1
                }
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in GetAllAsync");
            return new ExampleTable1ApiResponse<List<ExampleTable1Response>>
            {
                Success = false,
                Error = new ExampleTable1ErrorInfo
                {
                    Code = "INTERNAL_ERROR",
                    Message = "An error occurred while retrieving records",
                    Details = ex.Message
                },
                Meta = new ExampleTable1MetaData()
            };
        }
    }

    public async Task<ExampleTable1ApiResponse<ExampleTable1Response>> GetByIdAsync(Guid id)
    {
        try
        {
            var entity = await _repository.GetByIdAsync(id);

            if (entity == null)
            {
                return new ExampleTable1ApiResponse<ExampleTable1Response>
                {
                    Success = false,
                    Error = new ExampleTable1ErrorInfo
                    {
                        Code = "RESOURCE_NOT_FOUND",
                        Message = $"Record with id {id} not found"
                    },
                    Meta = new ExampleTable1MetaData()
                };
            }

            return new ExampleTable1ApiResponse<ExampleTable1Response>
            {
                Success = true,
                Data = MapToResponse(entity),
                Meta = new ExampleTable1MetaData()
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in GetByIdAsync for id: {Id}", id);
            return new ExampleTable1ApiResponse<ExampleTable1Response>
            {
                Success = false,
                Error = new ExampleTable1ErrorInfo
                {
                    Code = "INTERNAL_ERROR",
                    Message = "An error occurred while retrieving the record",
                    Details = ex.Message
                },
                Meta = new ExampleTable1MetaData()
            };
        }
    }

    public async Task<ExampleTable1ApiResponse<ExampleTable1Response>> CreateAsync(CreateExampleTable1Request request)
    {
        try
        {
            var entity = new ExampleTable1Entity
            {
                ExampleTable1Name = request.ExampleTable1Name,
                ExampleTable1Description = request.ExampleTable1Description,
                Status = request.Status
            };

            var created = await _repository.CreateAsync(entity);

            return new ExampleTable1ApiResponse<ExampleTable1Response>
            {
                Success = true,
                Data = MapToResponse(created),
                Meta = new ExampleTable1MetaData()
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in CreateAsync");
            return new ExampleTable1ApiResponse<ExampleTable1Response>
            {
                Success = false,
                Error = new ExampleTable1ErrorInfo
                {
                    Code = "INTERNAL_ERROR",
                    Message = "An error occurred while creating the record",
                    Details = ex.Message
                },
                Meta = new ExampleTable1MetaData()
            };
        }
    }

    public async Task<ExampleTable1ApiResponse<ExampleTable1Response>> UpdateAsync(Guid id, UpdateExampleTable1Request request)
    {
        try
        {
            var entity = new ExampleTable1Entity
            {
                ExampleTable1Name = request.ExampleTable1Name,
                ExampleTable1Description = request.ExampleTable1Description,
                Status = request.Status
            };

            var updated = await _repository.UpdateAsync(id, entity);

            if (updated == null)
            {
                return new ExampleTable1ApiResponse<ExampleTable1Response>
                {
                    Success = false,
                    Error = new ExampleTable1ErrorInfo
                    {
                        Code = "RESOURCE_NOT_FOUND",
                        Message = $"Record with id {id} not found"
                    },
                    Meta = new ExampleTable1MetaData()
                };
            }

            return new ExampleTable1ApiResponse<ExampleTable1Response>
            {
                Success = true,
                Data = MapToResponse(updated),
                Meta = new ExampleTable1MetaData()
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in UpdateAsync for id: {Id}", id);
            return new ExampleTable1ApiResponse<ExampleTable1Response>
            {
                Success = false,
                Error = new ExampleTable1ErrorInfo
                {
                    Code = "INTERNAL_ERROR",
                    Message = "An error occurred while updating the record",
                    Details = ex.Message
                },
                Meta = new ExampleTable1MetaData()
            };
        }
    }

    public async Task<ExampleTable1ApiResponse<ExampleTable1Response>> PatchAsync(Guid id, PatchExampleTable1Request request)
    {
        try
        {
            var patched = await _repository.PatchAsync(id, request);

            if (patched == null)
            {
                return new ExampleTable1ApiResponse<ExampleTable1Response>
                {
                    Success = false,
                    Error = new ExampleTable1ErrorInfo
                    {
                        Code = "RESOURCE_NOT_FOUND",
                        Message = $"Record with id {id} not found"
                    },
                    Meta = new ExampleTable1MetaData()
                };
            }

            return new ExampleTable1ApiResponse<ExampleTable1Response>
            {
                Success = true,
                Data = MapToResponse(patched),
                Meta = new ExampleTable1MetaData()
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in PatchAsync for id: {Id}", id);
            return new ExampleTable1ApiResponse<ExampleTable1Response>
            {
                Success = false,
                Error = new ExampleTable1ErrorInfo
                {
                    Code = "INTERNAL_ERROR",
                    Message = "An error occurred while patching the record",
                    Details = ex.Message
                },
                Meta = new ExampleTable1MetaData()
            };
        }
    }

    public async Task<ExampleTable1ApiResponse<bool>> DeleteAsync(Guid id)
    {
        try
        {
            var deleted = await _repository.DeleteAsync(id);

            if (!deleted)
            {
                return new ExampleTable1ApiResponse<bool>
                {
                    Success = false,
                    Error = new ExampleTable1ErrorInfo
                    {
                        Code = "RESOURCE_NOT_FOUND",
                        Message = $"Record with id {id} not found"
                    },
                    Meta = new ExampleTable1MetaData()
                };
            }

            return new ExampleTable1ApiResponse<bool>
            {
                Success = true,
                Data = true,
                Meta = new ExampleTable1MetaData()
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in DeleteAsync for id: {Id}", id);
            return new ExampleTable1ApiResponse<bool>
            {
                Success = false,
                Error = new ExampleTable1ErrorInfo
                {
                    Code = "INTERNAL_ERROR",
                    Message = "An error occurred while deleting the record",
                    Details = ex.Message
                },
                Meta = new ExampleTable1MetaData()
            };
        }
    }

    private ExampleTable1Response MapToResponse(ExampleTable1Entity entity)
    {
        return new ExampleTable1Response
        {
            ExampleTable1Id = entity.ExampleTable1Id,
            ExampleTable1Name = entity.ExampleTable1Name,
            ExampleTable1Description = entity.ExampleTable1Description,
            Status = entity.Status,
            CreatedAt = entity.CreatedAt,
            UpdatedAt = entity.UpdatedAt
        };
    }
}
