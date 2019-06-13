namespace Backend.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.GeoLocations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Lat = c.Double(nullable: false),
                        Lon = c.Double(nullable: false),
                        Line_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Lines", t => t.Line_Id)
                .Index(t => t.Line_Id);
            
            CreateTable(
                "dbo.Lines",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Color = c.String(),
                        LineType = c.Int(nullable: false),
                        Station_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Stations", t => t.Station_Id)
                .Index(t => t.Station_Id);
            
            CreateTable(
                "dbo.Pricelists",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TicketType = c.Int(nullable: false),
                        PassengerType = c.Int(nullable: false),
                        Price = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => new { t.TicketType, t.PassengerType }, unique: true, name: "Pricelist_1");
            
            CreateTable(
                "dbo.Stations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        GeoLocation_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.GeoLocations", t => t.GeoLocation_Id)
                .Index(t => t.GeoLocation_Id);
            
            CreateTable(
                "dbo.Timetables",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        DayOfWeek = c.Int(nullable: false),
                        Line_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Lines", t => t.Line_Id)
                .Index(t => t.DayOfWeek, unique: true, name: "Timetable_1")
                .Index(t => t.Line_Id);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FirstName = c.String(),
                        LastName = c.String(),
                        Email = c.String(maxLength: 100, unicode: false),
                        Password = c.String(),
                        DayOfBirth = c.DateTime(nullable: false),
                        Address = c.String(),
                        PassengerType = c.Int(nullable: false),
                        AdditionalInfo = c.String(),
                        UserType = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Email, unique: true);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Timetables", "Line_Id", "dbo.Lines");
            DropForeignKey("dbo.Lines", "Station_Id", "dbo.Stations");
            DropForeignKey("dbo.Stations", "GeoLocation_Id", "dbo.GeoLocations");
            DropForeignKey("dbo.GeoLocations", "Line_Id", "dbo.Lines");
            DropIndex("dbo.Users", new[] { "Email" });
            DropIndex("dbo.Timetables", new[] { "Line_Id" });
            DropIndex("dbo.Timetables", "Timetable_1");
            DropIndex("dbo.Stations", new[] { "GeoLocation_Id" });
            DropIndex("dbo.Pricelists", "Pricelist_1");
            DropIndex("dbo.Lines", new[] { "Station_Id" });
            DropIndex("dbo.GeoLocations", new[] { "Line_Id" });
            DropTable("dbo.Users");
            DropTable("dbo.Timetables");
            DropTable("dbo.Stations");
            DropTable("dbo.Pricelists");
            DropTable("dbo.Lines");
            DropTable("dbo.GeoLocations");
        }
    }
}
