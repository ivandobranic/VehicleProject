using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Project.DAL.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           

            migrationBuilder.CreateTable(
                name: "VehiclesForSale",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Price = table.Column<int>(nullable: false),
                    VehicleMake = table.Column<string>(nullable: true),
                    VehicleModel = table.Column<string>(nullable: true),
                    VehiclePicture = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehiclesForSale", x => x.Id);
                });

          

            migrationBuilder.CreateTable(
                name: "Cart",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Price = table.Column<float>(nullable: false),
                    Quantity = table.Column<int>(nullable: false),
                    UserName = table.Column<string>(nullable: true),
                    VehicleMake = table.Column<string>(nullable: true),
                    VehicleModel = table.Column<string>(nullable: true),
                    VehiclesForSaleId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cart", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cart_VehiclesForSale_VehiclesForSaleId",
                        column: x => x.VehiclesForSaleId,
                        principalTable: "VehiclesForSale",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ItemsInStockModel",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ItemsInStock = table.Column<int>(nullable: false),
                    VehiclesForSaleId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemsInStockModel", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ItemsInStockModel_VehiclesForSale_VehiclesForSaleId",
                        column: x => x.VehiclesForSaleId,
                        principalTable: "VehiclesForSale",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cart_VehiclesForSaleId",
                table: "Cart",
                column: "VehiclesForSaleId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemsInStockModel_VehiclesForSaleId",
                table: "ItemsInStockModel",
                column: "VehiclesForSaleId",
                unique: true);

          
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cart");

           
            migrationBuilder.DropTable(
                name: "ItemsInStockModel");

           

            migrationBuilder.DropTable(
                name: "VehiclesForSale");

          
        }
    }
}
