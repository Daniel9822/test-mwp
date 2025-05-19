"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, X, Upload } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mockCategories } from "@/data/mockEcommerceData";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Form schema
const productFormSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Product description must be at least 10 characters.",
  }),
  price: z.coerce.number().positive({
    message: "Price must be a positive number.",
  }),
  form: z.string().min(1, {
    message: "Form is required.",
  }),
  material: z.string().min(1, {
    message: "Material is required.",
  }),
  size: z.array(z.string()).min(1, {
    message: "At least one size is required.",
  }),
  uuidCategory: z.string().min(1, {
    message: "Category is required.",
  }),
  stock: z.boolean().default(true),
  options: z.array(z.string()).optional(),
  imageUrl: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

export default function AddProductPage() {
  const [sizes, setSizes] = useState<string[]>([]);
  const [newSize, setNewSize] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState("");
  const [packSizes, setPackSizes] = useState<string[]>([]);
  const [newPackSize, setNewPackSize] = useState("");
  const [packDetails, setPackDetails] = useState<{
    [size: string]: { price: number; qty: number }[];
  }>({});

  // Initialize form with default values
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      form: "",
      material: "",
      size: [],
      uuidCategory: "",
      stock: true,
      options: [],
    },
  });

  // Form submission handler
  function onSubmit(data: ProductFormValues) {
    // Here we would normally add the product to the database
    console.log("Form data:", data);
    console.log("Pack details:", packDetails);

    // You would normally redirect to the products page after adding
    alert("Product added successfully!");
  }

  // Add new size
  const handleAddSize = () => {
    if (newSize && !sizes.includes(newSize)) {
      const updatedSizes = [...sizes, newSize];
      setSizes(updatedSizes);
      form.setValue("size", updatedSizes);
      setNewSize("");
    }
  };

  // Remove size
  const handleRemoveSize = (size: string) => {
    const updatedSizes = sizes.filter(s => s !== size);
    setSizes(updatedSizes);
    form.setValue("size", updatedSizes);
  };

  // Add new option
  const handleAddOption = () => {
    if (newOption && !options.includes(newOption)) {
      const updatedOptions = [...options, newOption];
      setOptions(updatedOptions);
      form.setValue("options", updatedOptions);
      setNewOption("");
    }
  };

  // Remove option
  const handleRemoveOption = (option: string) => {
    const updatedOptions = options.filter(o => o !== option);
    setOptions(updatedOptions);
    form.setValue("options", updatedOptions);
  };

  // Add new pack size
  const handleAddPackSize = () => {
    if (newPackSize && !packSizes.includes(newPackSize)) {
      const updatedPackSizes = [...packSizes, newPackSize];
      setPackSizes(updatedPackSizes);
      setPackDetails({
        ...packDetails,
        [newPackSize]: [{ price: form.getValues("price"), qty: 0 }],
      });
      setNewPackSize("");
    }
  };

  // Remove pack size
  const handleRemovePackSize = (packSize: string) => {
    const updatedPackSizes = packSizes.filter(p => p !== packSize);
    const updatedPackDetails = { ...packDetails };
    delete updatedPackDetails[packSize];

    setPackSizes(updatedPackSizes);
    setPackDetails(updatedPackDetails);
  };

  // Update pack details
  const handlePackDetailChange = (
    packSize: string,
    field: "price" | "qty",
    value: number
  ) => {
    const updatedPackDetails = { ...packDetails };
    updatedPackDetails[packSize][0][field] = value;
    setPackDetails(updatedPackDetails);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link href="/ecommerce/products">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Add New Product</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div className="text-xl font-semibold">Basic Information</div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter product description"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Base Price ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="uuidCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockCategories.map((category) => (
                          <SelectItem
                            key={category.uuid_category}
                            value={category.uuid_category}
                          >
                            {category.category_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>In Stock</FormLabel>
                      <FormDescription>
                        This product is currently available for purchase
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Additional Details */}
            <div className="space-y-6">
              <div className="text-xl font-semibold">Additional Details</div>

              <FormField
                control={form.control}
                name="form"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Form</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Round, Square, T-shirt" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="material"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Material</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Cotton, Metal, Wood" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Sizes */}
              <FormItem>
                <FormLabel>Available Sizes</FormLabel>
                <div className="flex flex-wrap gap-2 mb-2">
                  {sizes.map((size) => (
                    <Badge key={size} className="gap-1 py-1">
                      {size}
                      <button
                        type="button"
                        onClick={() => handleRemoveSize(size)}
                        className="ml-1 text-xs text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add size (e.g., S, M, L, XL)"
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleAddSize}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </FormItem>

              {/* Options */}
              <FormItem>
                <FormLabel>Product Options (e.g., Colors)</FormLabel>
                <div className="flex flex-wrap gap-2 mb-2">
                  {options.map((option) => (
                    <Badge key={option} variant="outline" className="gap-1 py-1">
                      {option}
                      <button
                        type="button"
                        onClick={() => handleRemoveOption(option)}
                        className="ml-1 text-xs text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add option (e.g., Red, Blue, Green)"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleAddOption}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </FormItem>

              {/* Product Image */}
              <FormItem>
                <FormLabel>Product Image</FormLabel>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <div className="mx-auto flex flex-col items-center justify-center gap-1">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <p className="text-sm font-medium">Drag and drop or click to upload</p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG or WEBP (max. 5MB)
                    </p>
                    <Input
                      type="file"
                      className="hidden"
                      id="product-image"
                      accept="image/*"
                    />
                    <Button variant="outline" size="sm" className="mt-2">
                      Select Image
                    </Button>
                  </div>
                </div>
              </FormItem>
            </div>
          </div>

          {/* Pack Information */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="text-xl font-semibold">Pack Information</div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add pack size (e.g., Single, Pair, Box of 10)"
                  value={newPackSize}
                  onChange={(e) => setNewPackSize(e.target.value)}
                  className="w-[300px]"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddPackSize}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Pack
                </Button>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {packSizes.map((packSize) => (
                <Card key={packSize}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold">{packSize}</h3>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemovePackSize(packSize)}
                        className="text-destructive h-8 w-8"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <FormLabel>Price ($)</FormLabel>
                        <Input
                          type="number"
                          step="0.01"
                          value={packDetails[packSize][0]?.price || 0}
                          onChange={(e) =>
                            handlePackDetailChange(
                              packSize,
                              "price",
                              parseFloat(e.target.value)
                            )
                          }
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <FormLabel>Quantity</FormLabel>
                        <Input
                          type="number"
                          value={packDetails[packSize][0]?.qty || 0}
                          onChange={(e) =>
                            handlePackDetailChange(
                              packSize,
                              "qty",
                              parseInt(e.target.value)
                            )
                          }
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Link href="/ecommerce/products">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit">Add Product</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
