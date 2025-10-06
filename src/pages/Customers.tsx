import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Users, Phone, Mail, MapPin } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const mockCustomers = [
  { 
    id: '1',
    name: 'สมชาย ใจดี', 
    phone: '081-234-5678',
    email: 'somchai@email.com',
    address: 'กรุงเทพฯ',
    totalJobs: 5,
    totalSpent: 18450,
    lastVisit: '2024-01-15',
  },
  { 
    id: '2',
    name: 'วิไล สุขใจ', 
    phone: '082-345-6789',
    email: 'wilai@email.com',
    address: 'นนทบุรี',
    totalJobs: 3,
    totalSpent: 8900,
    lastVisit: '2024-01-16',
  },
  { 
    id: '3',
    name: 'ประยุทธ์ มั่นคง', 
    phone: '083-456-7890',
    email: 'prayut@email.com',
    address: 'ปทุมธานี',
    totalJobs: 8,
    totalSpent: 32100,
    lastVisit: '2024-01-16',
  },
  { 
    id: '4',
    name: 'สุภา ดีงาม', 
    phone: '084-567-8901',
    email: 'supa@email.com',
    address: 'กรุงเทพฯ',
    totalJobs: 2,
    totalSpent: 12300,
    lastVisit: '2024-01-14',
  },
];

export default function Customers() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">ลูกค้า</h1>
          <p className="text-muted-foreground">จัดการข้อมูลลูกค้าและประวัติการใช้บริการ</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          เพิ่มลูกค้า
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-primary/10 p-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{mockCustomers.length}</p>
              <p className="text-sm text-muted-foreground">ลูกค้าทั้งหมด</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-success/10 p-3">
              <Phone className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">18</p>
              <p className="text-sm text-muted-foreground">งานซ่อมทั้งหมด</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-accent/10 p-3">
              <Mail className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">฿71,750</p>
              <p className="text-sm text-muted-foreground">รายได้รวม</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>รายชื่อลูกค้า</CardTitle>
            <div className="relative sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="ค้นหาชื่อ, เบอร์โทร, อีเมล..."
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
                  <TableHead>ชื่อลูกค้า</TableHead>
                  <TableHead>ติดต่อ</TableHead>
                  <TableHead>ที่อยู่</TableHead>
                  <TableHead className="text-center">งานซ่อม</TableHead>
                  <TableHead className="text-right">ยอดใช้จ่าย</TableHead>
                  <TableHead>มาล่าสุด</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span>{customer.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          <span>{customer.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{customer.address}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{customer.totalJobs} งาน</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ฿{customer.totalSpent.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {new Date(customer.lastVisit).toLocaleDateString('th-TH', { 
                        day: 'numeric', 
                        month: 'short' 
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
