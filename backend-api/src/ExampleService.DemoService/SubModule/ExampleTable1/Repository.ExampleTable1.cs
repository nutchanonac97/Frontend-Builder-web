using Microsoft.EntityFrameworkCore;
using ToptechCmmUniversalBackendApi.ExampleService.DemoService.ExampleTable1.Data;
using ToptechCmmUniversalBackendApi.ExampleService.DemoService.ExampleTable1.Entities;
using ToptechCmmUniversalBackendApi.ExampleService.DemoService.ExampleTable1.Models;

namespace ToptechCmmUniversalBackendApi.ExampleService.DemoService.ExampleTable1.Repositories;

public interface IExampleTable1Repository
{
    Task<(List<ExampleTable1Entity> items, int total)> GetAllAsync(GetExampleTable1ListQuery query);
    Task<ExampleTable1Entity?> GetByIdAsync(Guid id);
    Task<ExampleTable1Entity> CreateAsync(ExampleTable1Entity entity);
    Task<ExampleTable1Entity?> UpdateAsync(Guid id, ExampleTable1Entity entity);
    Task<ExampleTable1Entity?> PatchAsync(Guid id, PatchExampleTable1Request request);
    Task<bool> DeleteAsync(Guid id);
}

public class ExampleTable1Repository : IExampleTable1Repository
{
    private readonly ExampleTable1DbContext _context;
    private readonly ILogger<ExampleTable1Repository> _logger;

    public ExampleTable1Repository(
        ExampleTable1DbContext context,
        ILogger<ExampleTable1Repository> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(List<ExampleTable1Entity> items, int total)> GetAllAsync(GetExampleTable1ListQuery query)
    {
        try
        {
            var queryable = _context.ExampleTable1.AsQueryable();

            // Apply filters
            if (!string.IsNullOrEmpty(query.Status))
            {
                queryable = queryable.Where(x => x.Status == query.Status);
            }

            if (!string.IsNullOrEmpty(query.SearchName))
            {
                queryable = queryable.Where(x => x.ExampleTable1Name.Contains(query.SearchName));
            }

            // Get total count before pagination
            var total = await queryable.CountAsync();

            // Apply sorting
            queryable = query.SortBy?.ToLower() switch
            {
                "exampletable1_name" => query.SortOrder?.ToLower() == "desc"
                    ? queryable.OrderByDescending(x => x.ExampleTable1Name)
                    : queryable.OrderBy(x => x.ExampleTable1Name),
                "status" => query.SortOrder?.ToLower() == "desc"
                    ? queryable.OrderByDescending(x => x.Status)
                    : queryable.OrderBy(x => x.Status),
                "createdat" => query.SortOrder?.ToLower() == "desc"
                    ? queryable.OrderByDescending(x => x.CreatedAt)
                    : queryable.OrderBy(x => x.CreatedAt),
                "updatedat" => query.SortOrder?.ToLower() == "desc"
                    ? queryable.OrderByDescending(x => x.UpdatedAt)
                    : queryable.OrderBy(x => x.UpdatedAt),
                _ => query.SortOrder?.ToLower() == "desc"
                    ? queryable.OrderByDescending(x => x.ExampleTable1Id)
                    : queryable.OrderBy(x => x.ExampleTable1Id)
            };

            // Apply pagination
            var items = await queryable
                .Skip((query.Page - 1) * query.Limit)
                .Take(query.Limit)
                .ToListAsync();

            return (items, total);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting all ExampleTable1 records");
            throw;
        }
    }

    public async Task<ExampleTable1Entity?> GetByIdAsync(Guid id)
    {
        try
        {
            return await _context.ExampleTable1.FindAsync(id);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting ExampleTable1 by id: {Id}", id);
            throw;
        }
    }

    public async Task<ExampleTable1Entity> CreateAsync(ExampleTable1Entity entity)
    {
        try
        {
            entity.ExampleTable1Id = Guid.NewGuid();
            entity.CreatedAt = DateTime.UtcNow;
            entity.UpdatedAt = DateTime.UtcNow;

            _context.ExampleTable1.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating ExampleTable1 record");
            throw;
        }
    }

    public async Task<ExampleTable1Entity?> UpdateAsync(Guid id, ExampleTable1Entity entity)
    {
        try
        {
            var existing = await _context.ExampleTable1.FindAsync(id);
            if (existing == null)
            {
                return null;
            }

            existing.ExampleTable1Name = entity.ExampleTable1Name;
            existing.ExampleTable1Description = entity.ExampleTable1Description;
            existing.Status = entity.Status;
            existing.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return existing;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating ExampleTable1 record: {Id}", id);
            throw;
        }
    }

    public async Task<ExampleTable1Entity?> PatchAsync(Guid id, PatchExampleTable1Request request)
    {
        try
        {
            var existing = await _context.ExampleTable1.FindAsync(id);
            if (existing == null)
            {
                return null;
            }

            if (request.ExampleTable1Name != null)
                existing.ExampleTable1Name = request.ExampleTable1Name;

            if (request.ExampleTable1Description != null)
                existing.ExampleTable1Description = request.ExampleTable1Description;

            if (request.Status != null)
                existing.Status = request.Status;

            existing.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return existing;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error patching ExampleTable1 record: {Id}", id);
            throw;
        }
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        try
        {
            var entity = await _context.ExampleTable1.FindAsync(id);
            if (entity == null)
            {
                return false;
            }

            _context.ExampleTable1.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting ExampleTable1 record: {Id}", id);
            throw;
        }
    }
}
