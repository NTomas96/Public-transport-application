namespace Backend.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Lines",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Color = c.String(),
                        LineType = c.Int(nullable: false),
                        WaypointsInternal = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Stations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Lat = c.Double(nullable: false),
                        Lon = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
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
                "dbo.Timetables",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        DayOfWeek = c.Int(nullable: false),
                        DeparturesInternal = c.String(),
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
            
            CreateTable(
                "dbo.Vehicles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        TrackerSerial = c.String(maxLength: 100, unicode: false),
                        Lat = c.Double(nullable: false),
                        Lon = c.Double(nullable: false),
                        Line_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Lines", t => t.Line_Id)
                .Index(t => t.TrackerSerial, unique: true)
                .Index(t => t.Line_Id);
            
            CreateTable(
                "dbo.StationLines",
                c => new
                    {
                        Station_Id = c.Int(nullable: false),
                        Line_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Station_Id, t.Line_Id })
                .ForeignKey("dbo.Stations", t => t.Station_Id, cascadeDelete: true)
                .ForeignKey("dbo.Lines", t => t.Line_Id, cascadeDelete: true)
                .Index(t => t.Station_Id)
                .Index(t => t.Line_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Vehicles", "Line_Id", "dbo.Lines");
            DropForeignKey("dbo.Timetables", "Line_Id", "dbo.Lines");
            DropForeignKey("dbo.StationLines", "Line_Id", "dbo.Lines");
            DropForeignKey("dbo.StationLines", "Station_Id", "dbo.Stations");
            DropIndex("dbo.StationLines", new[] { "Line_Id" });
            DropIndex("dbo.StationLines", new[] { "Station_Id" });
            DropIndex("dbo.Vehicles", new[] { "Line_Id" });
            DropIndex("dbo.Vehicles", new[] { "TrackerSerial" });
            DropIndex("dbo.Users", new[] { "Email" });
            DropIndex("dbo.Timetables", new[] { "Line_Id" });
            DropIndex("dbo.Timetables", "Timetable_1");
            DropIndex("dbo.Pricelists", "Pricelist_1");
            DropTable("dbo.StationLines");
            DropTable("dbo.Vehicles");
            DropTable("dbo.Users");
            DropTable("dbo.Timetables");
            DropTable("dbo.Pricelists");
            DropTable("dbo.Stations");
            DropTable("dbo.Lines");
        }
    }
}
