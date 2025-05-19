"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Edit,
  Trash2,
  Plus,
  Search,
  Upload,
  X
} from "lucide-react";
import { mockCategories } from "@/data/mockEcommerceData";
import { CategoriesInterface } from "@/types/ecommerce";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Form schema for category
const categoryFormSchema = z.object({
  category_name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
  category_description: z.string().min(5, {
    message: "Category description must be at least 5 characters.",
  }),
  image_url: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCategory, setEditingCategory] = useState<CategoriesInterface | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<CategoriesInterface | null>(null);

  // Initialize form for adding/editing category
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      category_name: "",
      category_description: "",
      image_url: "",
    },
  });

  // Filter categories based on search query
  const filteredCategories = mockCategories.filter(category =>
    category.category_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.category_description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open edit dialog with category data
  const handleEdit = (category: CategoriesInterface) => {
    setEditingCategory(category);
    form.reset({
      category_name: category.category_name,
      category_description: category.category_description,
      image_url: category.image_url,
    });
    setIsEditDialogOpen(true);
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (category: CategoriesInterface) => {
    setCategoryToDelete(category);
    setIsDeleteDialogOpen(true);
  };

  // Submit form handler
  const onSubmit = (data: CategoryFormValues) => {
    if (editingCategory) {
      // Here we would update the category in the database
      console.log("Update category:", { ...editingCategory, ...data });
      setIsEditDialogOpen(false);
    } else {
      // Here we would add the new category to the database
      console.log("Add new category:", {
        ...data,
        uuid_category: `cat-${Date.now()}`,
      });
      setIsAddDialogOpen(false);
    }

    // Reset form after submission
    form.reset();
  };

  // Delete category
  const handleDelete = () => {
    if (categoryToDelete) {
      // Here we would delete the category from the database
      console.log("Delete category:", categoryToDelete);
      setIsDeleteDialogOpen(false);
      setCategoryToDelete(null);
    }
  };

  // Open add dialog
  const handleAdd = () => {
    setEditingCategory(null);
    form.reset({
      category_name: "",
      category_description: "",
      image_url: "",
    });
    setIsAddDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search categories..."
          className="pl-10 max-w-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <Card key={category.uuid_category} className="overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src={category.image_url}
                alt={category.category_name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex justify-end p-3 gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleEdit(category)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleDeleteClick(category)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg">{category.category_name}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {category.category_description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Category Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Create a new product category for your store.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="category_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter category name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter category description"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Category Image</FormLabel>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <div className="mx-auto flex flex-col items-center gap-1">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm font-medium">
                      Drag and drop or click to upload
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG or WEBP (max. 5MB)
                    </p>
                    <Input
                      type="file"
                      className="hidden"
                      id="category-image"
                      accept="image/*"
                    />
                    <Button variant="outline" size="sm" className="mt-2">
                      Select Image
                    </Button>
                  </div>
                </div>
              </FormItem>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Category</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the category information.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="category_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter category name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter category description"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Category Image</FormLabel>
                {editingCategory?.image_url ? (
                  <div className="relative rounded-md overflow-hidden h-48">
                    <Image
                      src={editingCategory.image_url}
                      alt={editingCategory.category_name}
                      fill
                      className="object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8"
                      onClick={() => {
                        form.setValue("image_url", "");
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <div className="mx-auto flex flex-col items-center gap-1">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <p className="text-sm font-medium">
                        Drag and drop or click to upload
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG or WEBP (max. 5MB)
                      </p>
                      <Input
                        type="file"
                        className="hidden"
                        id="category-image-edit"
                        accept="image/*"
                      />
                      <Button variant="outline" size="sm" className="mt-2">
                        Select Image
                      </Button>
                    </div>
                  </div>
                )}
              </FormItem>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Category Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this category?
              {categoryToDelete && (
                <span className="font-semibold block mt-1">
                  {categoryToDelete.category_name}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
