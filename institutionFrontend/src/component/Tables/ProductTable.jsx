import React from "react";
import {Button, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {useNavigate} from "react-router-dom";

export const ProductColumnsHeading = () => {
  const navigate = useNavigate();

  const handleNavigate = (productId) => {
    navigate("/shop-admin/product-form/", {
      state: {
        mode: "edit",
        productId:productId ,
      },
    });
  };

  const handleViewDetails = (productId) => {
    navigate(`/shop-admin/product/details/${productId}/`);
  };

  return [
    {field: "rowNumber", headerName: "#"},
    {field: "id", headerName: "ID", flex: 0.1},
    {
      field: "name",
      headerName: "Products Name",
      flex: 0.3,
      minWidth: 200,
      renderCell: (params) => (
        <div
          onClick={() => handleNavigate(params.row.id)}
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            maxWidth: "100%",
            cursor: "pointer",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.textDecoration = "underline")
          }
          onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          {params.value || "N/A"}
        </div>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      flex: 0.4,
      minWidth: 155,
    },
    {
      field: "sub_category",
      headerName: "Sub Category",
      flex: 0.2,
      renderCell: (params) => params.row.sub_category?.name || "N/A",
    },
    {
      field: "category",
      headerName: "Category",
      flex: 0.2,
      renderCell: (params) => params.row.sub_category?.category_name || "N/A",
    },
    {
      field: "is_active",
      headerName: "Status",
      flex: 0.2,
      renderCell: (params) => (params.value ? "Active" : "Inactive"),
    },
    {
      field: "Actions",
      headerName: "Actions",
      flex: 0.2,
      renderCell: (params) => {
        const handleEdit = () => {
          navigate("/shop-admin/product-form/", {
            state: {
              mode: "edit",
              subCategory: params.row.sub_category.name,
              productId: params.row.id,
            },
          });
        };

        return (
          <>
            <Button onClick={() => handleViewDetails(params.row.id)}>
              View Items
            </Button>
            <IconButton onClick={handleEdit}>
              <EditIcon sx={{color: "#00aeff"}} />
            </IconButton>
          </>
        );
      },
    },
  ];
};
