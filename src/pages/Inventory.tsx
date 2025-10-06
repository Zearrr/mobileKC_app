import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Package, AlertCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const mockInventory = [
  { 
    id: '1', 
    sku: 'SCREEN-IP14P',
    name: 'หน้าจอ iPhone 14 Pro', 
    category: 'อะไหล่', 
    stock: 2,
    minStock: 5,
    unit: 'ชิ้น',
    cost: 3500,
    price: 4500,
  },
  { 
    id: '2', 
    sku: 'BAT-S23',
    name: 'แบตเตอรี่ Samsung Galaxy S23', 
    category: 'อะไหล่', 
    stock: 1,
    minStock: 3,
    unit: 'ชิ้น',
    cost: 1800,
    price: 2800,
  },
  { 
    id: '3', 
    sku: 'CABLE-TC',
    name: 'สายชาร์จ Type-C', 
    category: 'อุปกรณ์เสริม', 
    stock: 8,
    minStock: 10,
    unit: 'เส้น',
    cost: 80,
    price: 150,
  },
  { 
    id: '4', 
    sku: 'CASE-IP14',
    name: 'เคส iPhone 14', 
    category: 'อุปกรณ์เสริม', 
    stock: 25,
    minStock: 15,
    unit: 'ชิ้น',
    cost: 120,
    price: 299,
  },
  { 
    id: '5', 
    sku: 'GLASS-UNIV',
    name: 'ฟิล์มกระจกกันรอย', 
    category: 'อุปกรณ์เสริม', 
    stock: 45,
    minStock: 20,
    unit: 'แผ่น',
    cost: 50,
    price: 150,
  },
];

export default function Inventory() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = mockInventory.filter(item =>
    item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowStockCount = mockInventory.filter(item => item.stock < item.minStock).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">คลังสินค้า</h1>
          <p className="text-muted-foreground">จัดการสินค้าและอะไหล่</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          เพิ่มสินค้า
        </Button>
      </div>

      {lowStockCount > 0 && (
        <Card className="border-warning bg-warning/5 shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <AlertCircle className="h-5 w-5 text-warning" />
            <p className="text-sm">
              <span className="font-semibold">แจ้งเตือน:</span> มีสินค้า {lowStockCount} รายการที่คงเหลือต่ำกว่าขั้นต่ำ
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              รายการสินค้า
            </CardTitle>
            <div className="relative sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="ค้นหา SKU, ชื่อสินค้า..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>ชื่อสินค้า</TableHead>
                  <TableHead>หมวดหมู่</TableHead>
                  <TableHead className="text-center">คงเหลือ</TableHead>
                  <TableHead className="text-right">ต้นทุน</TableHead>
                  <TableHead className="text-right">ราคาขาย</TableHead>
                  <TableHead className="text-right">กำไร</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => {
                  const isLowStock = item.stock < item.minStock;
                  const profit = item.price - item.cost;
                  const profitPercent = ((profit / item.cost) * 100).toFixed(0);

                  return (
                    <TableRow key={item.id} className="hover:bg-muted/50">
                      <TableCell>
                        <span className="font-mono text-sm">{item.sku}</span>
                      </TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span className={isLowStock ? 'font-semibold text-warning' : ''}>
                            {item.stock}
                          </span>
                          <span className="text-muted-foreground">/ {item.minStock}</span>
                          <span className="text-sm text-muted-foreground">{item.unit}</span>
                          {isLowStock && (
                            <AlertCircle className="h-4 w-4 text-warning" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        ฿{item.cost.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        ฿{item.price.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-col items-end">
                          <span className="font-medium text-success">
                            +฿{profit.toLocaleString()}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ({profitPercent}%)
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
