using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Toolbelt.ComponentModel.DataAnnotations;

namespace Backend.Persistence
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Timetable> Timetables { get; set; }
        public DbSet<Station> Stations { get; set; }
        public DbSet<Pricelist> Pricelists { get; set; }
        public DbSet<Line> Lines { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Ticket> Tickets { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=(localdb)\web2;Initial Catalog=AppDB;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<StationLine>()
                .HasKey(sl => new { sl.StationId, sl.LineId });
            modelBuilder.Entity<StationLine>()
                .HasOne(sl => sl.Station)
                .WithMany(s => s.Lines)
                .HasForeignKey(sl => sl.StationId);
            modelBuilder.Entity<StationLine>()
                .HasOne(sl => sl.Line)
                .WithMany(l => l.Stations)
                .HasForeignKey(sl => sl.LineId);

            base.OnModelCreating(modelBuilder);
            modelBuilder.BuildIndexesFromAnnotations();
        }
    }
}
