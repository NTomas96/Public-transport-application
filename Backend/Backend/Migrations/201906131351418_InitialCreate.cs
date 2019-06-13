namespace Backend.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.GeoLocations", "Line_Id", "dbo.Lines");
            DropForeignKey("dbo.Stations", "GeoLocation_Id", "dbo.GeoLocations");
            DropForeignKey("dbo.Lines", "Station_Id", "dbo.Stations");
            DropIndex("dbo.GeoLocations", new[] { "Line_Id" });
            DropIndex("dbo.Lines", new[] { "Station_Id" });
            DropIndex("dbo.Stations", new[] { "GeoLocation_Id" });
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
            
            AddColumn("dbo.Lines", "WaypointsInternal", c => c.String());
            AddColumn("dbo.Stations", "Lat", c => c.Double(nullable: false));
            AddColumn("dbo.Stations", "Lon", c => c.Double(nullable: false));
            AddColumn("dbo.Timetables", "DeparturesInternal", c => c.String());
            DropColumn("dbo.Lines", "Station_Id");
            DropColumn("dbo.Stations", "GeoLocation_Id");
            DropTable("dbo.GeoLocations");
        }
        
        public override void Down()
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
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Stations", "GeoLocation_Id", c => c.Int());
            AddColumn("dbo.Lines", "Station_Id", c => c.Int());
            DropForeignKey("dbo.Vehicles", "Line_Id", "dbo.Lines");
            DropForeignKey("dbo.StationLines", "Line_Id", "dbo.Lines");
            DropForeignKey("dbo.StationLines", "Station_Id", "dbo.Stations");
            DropIndex("dbo.StationLines", new[] { "Line_Id" });
            DropIndex("dbo.StationLines", new[] { "Station_Id" });
            DropIndex("dbo.Vehicles", new[] { "Line_Id" });
            DropIndex("dbo.Vehicles", new[] { "TrackerSerial" });
            DropColumn("dbo.Timetables", "DeparturesInternal");
            DropColumn("dbo.Stations", "Lon");
            DropColumn("dbo.Stations", "Lat");
            DropColumn("dbo.Lines", "WaypointsInternal");
            DropTable("dbo.StationLines");
            DropTable("dbo.Vehicles");
            CreateIndex("dbo.Stations", "GeoLocation_Id");
            CreateIndex("dbo.Lines", "Station_Id");
            CreateIndex("dbo.GeoLocations", "Line_Id");
            AddForeignKey("dbo.Lines", "Station_Id", "dbo.Stations", "Id");
            AddForeignKey("dbo.Stations", "GeoLocation_Id", "dbo.GeoLocations", "Id");
            AddForeignKey("dbo.GeoLocations", "Line_Id", "dbo.Lines", "Id");
        }
    }
}
