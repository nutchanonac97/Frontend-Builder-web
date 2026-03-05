using Microsoft.AspNetCore.Mvc;
using ToptechCmmUniversalBackendApi.ExampleService.DemoService.ExampleTable1.Models;
using ToptechCmmUniversalBackendApi.ExampleService.DemoService.ExampleTable1.Services;

namespace ToptechCmmUniversalBackendApi.ExampleService.DemoService.ExampleTable1.Endpoints;

public static class ExampleTable1Endpoints
{
    public static void MapExampleTable1Endpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/v1/api")
            .WithTags("ExampleService - DemoService - ExampleTable1")
            .WithOpenApi();

        // ===== GET Endpoints (เรียงก่อนเสมอ) =====

        // GET: Get all records with filtering and pagination
        group.MapGet("/ExampleService/DemoService/exampletable1/getList",
            async (
                [FromServices] IExampleTable1Service service,
                [AsParameters] GetExampleTable1ListQuery query) =>
            {
                var result = await service.GetAllAsync(query);
                return result.Success ? Results.Ok(result) : Results.BadRequest(result);
            })
            .WithName("GetExampleTable1List")
            .WithSummary("Get list of ExampleTable1 records with filtering and pagination")
            .Produces<ExampleTable1ApiResponse<List<ExampleTable1Response>>>(200)
            .Produces<ExampleTable1ApiResponse<List<ExampleTable1Response>>>(400);

        // GET: Get single record by ID
        group.MapGet("/ExampleService/DemoService/exampletable1/getById",
            async (
                [FromServices] IExampleTable1Service service,
                [FromQuery] Guid id) =>
            {
                var result = await service.GetByIdAsync(id);
                return result.Success ? Results.Ok(result) : Results.NotFound(result);
            })
            .WithName("GetExampleTable1ById")
            .WithSummary("Get ExampleTable1 record by ID")
            .Produces<ExampleTable1ApiResponse<ExampleTable1Response>>(200)
            .Produces<ExampleTable1ApiResponse<ExampleTable1Response>>(404);

        // ===== POST Endpoints =====

        // POST: Create new record
        group.MapPost("/ExampleService/DemoService/exampletable1/create",
            async (
                [FromServices] IExampleTable1Service service,
                [FromBody] CreateExampleTable1Request request) =>
            {
                var result = await service.CreateAsync(request);
                return result.Success ? Results.Created($"/v1/api/ExampleService/DemoService/exampletable1/getById?id={result.Data?.ExampleTable1Id}", result) : Results.BadRequest(result);
            })
            .WithName("CreateExampleTable1")
            .WithSummary("Create a new ExampleTable1 record")
            .Produces<ExampleTable1ApiResponse<ExampleTable1Response>>(201)
            .Produces<ExampleTable1ApiResponse<ExampleTable1Response>>(400);

        // ===== PUT Endpoints =====

        // PUT: Update entire record
        group.MapPut("/ExampleService/DemoService/exampletable1/update",
            async (
                [FromServices] IExampleTable1Service service,
                [FromQuery] Guid id,
                [FromBody] UpdateExampleTable1Request request) =>
            {
                var result = await service.UpdateAsync(id, request);
                return result.Success ? Results.Ok(result) : Results.NotFound(result);
            })
            .WithName("UpdateExampleTable1")
            .WithSummary("Update entire ExampleTable1 record")
            .Produces<ExampleTable1ApiResponse<ExampleTable1Response>>(200)
            .Produces<ExampleTable1ApiResponse<ExampleTable1Response>>(404);

        // ===== PATCH Endpoints =====

        // PATCH: Update partial record
        group.MapPatch("/ExampleService/DemoService/exampletable1/patch",
            async (
                [FromServices] IExampleTable1Service service,
                [FromQuery] Guid id,
                [FromBody] PatchExampleTable1Request request) =>
            {
                var result = await service.PatchAsync(id, request);
                return result.Success ? Results.Ok(result) : Results.NotFound(result);
            })
            .WithName("PatchExampleTable1")
            .WithSummary("Partially update ExampleTable1 record")
            .Produces<ExampleTable1ApiResponse<ExampleTable1Response>>(200)
            .Produces<ExampleTable1ApiResponse<ExampleTable1Response>>(404);

        // ===== DELETE Endpoints =====

        // DELETE: Delete record by ID
        group.MapDelete("/ExampleService/DemoService/exampletable1/delete",
            async (
                [FromServices] IExampleTable1Service service,
                [FromQuery] Guid id) =>
            {
                var result = await service.DeleteAsync(id);
                return result.Success ? Results.Ok(result) : Results.NotFound(result);
            })
            .WithName("DeleteExampleTable1")
            .WithSummary("Delete ExampleTable1 record by ID")
            .Produces<ExampleTable1ApiResponse<bool>>(200)
            .Produces<ExampleTable1ApiResponse<bool>>(404);
    }
}
