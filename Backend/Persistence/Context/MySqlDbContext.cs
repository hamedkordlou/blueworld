using Backend.Model;
using Microsoft.EntityFrameworkCore;

namespace Backend.Persistence.Context
{
    public class MySqlDbContext : DbContext
    {
        public DbSet<Marker> Markers { get; set; }
        public DbSet<SharedView> SharedViews { get; set; }
        public DbSet<View> Views { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Marker>()
                .HasKey(m => m.Id);
            modelBuilder.Entity<Marker>()
                .HasIndex(m => m.Uid)
                .IsUnique();

            modelBuilder.Entity<SharedView>()
                .HasMany(m => m.Markers);

            modelBuilder.Entity<View>()
                .HasMany(m => m.Markers);

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL("server=172.17.0.2;port=3306;database=db;uid=root;Password=qaz123;");
        }
    }

    

}