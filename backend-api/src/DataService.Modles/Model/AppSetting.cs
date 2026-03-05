using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TopTechInterBackend.DataService.Modles.Model

{
    [Table ("AppSettings", Schema = "tt_toptech_inter_db")]
public class AppSettings
{
    public int Id  {get;set;} 
    public string Key {get;set;}
    public string Value {get;set;}
}
}