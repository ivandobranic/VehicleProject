using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Project.DAL.Models
{
    public partial class VehicleContext : DbContext
    {
        public VehicleContext(DbContextOptions<VehicleContext> options) : base(options)
        {

        }
        public virtual DbSet<VehicleMake> VehicleMake { get; set; }
        public virtual DbSet<VehicleModel> VehicleModel { get; set; }
        public virtual DbSet<VehiclesForSale> VehiclesForSale {get; set;}
        public virtual DbSet<UserDetails> UserDetails{get; set;}
        public virtual DbSet<Cart> Cart {get; set;}
        public virtual DbSet<CustomerBankAccount> CustomerBankAccount {get; set;}
        public virtual DbSet<ItemsInStockModel> ItemsInStockModel {get; set;}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           
            modelBuilder.Entity<VehicleMake>(entity =>
            {
                entity.Property(e => e.Abrv)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20);
            });

            modelBuilder.Entity<VehicleModel>(entity =>
            {
                entity.HasIndex(e => e.MakeId)
                    .HasName("IX_MakeId");

                entity.Property(e => e.Abrv)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.HasOne(d => d.Make)
                    .WithMany(p => p.VehicleModel)
                    .HasForeignKey(d => d.MakeId)
                    .HasConstraintName("FK_dbo.VehicleModel_dbo.VehicleMake_MakeId");
            });

            modelBuilder.Entity<ItemsInStockModel>(entity =>
            {
              entity.HasOne(x => x.VehiclesForSale)
                    .WithOne(x => x.ItemsInStockModel)
                    .IsRequired()
                    .OnDelete(DeleteBehavior.Cascade);     

            });
            modelBuilder.Entity<Cart>(entity =>
            {
                entity.HasOne(x => x.VehiclesForSale)
                      .WithMany(x => x.Cart)
                      .HasForeignKey( x => x.VehiclesForSaleId)
                      .IsRequired()
                      .OnDelete(DeleteBehavior.Cascade);

            });




        }
    }
}
