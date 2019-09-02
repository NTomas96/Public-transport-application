namespace Backend.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemoveUniqueConstraint : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Timetables", "Timetable_1");
        }
        
        public override void Down()
        {
            CreateIndex("dbo.Timetables", "DayOfWeek", unique: true, name: "Timetable_1");
        }
    }
}
