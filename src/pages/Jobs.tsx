import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Eye } from 'lucide-react';
import { CreateJobDialog } from '@/components/jobs/CreateJobDialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const mockJobs = [
  { 
    id: 'JOB-001', 
    code: 'REP-2024-001',
    customer: 'สมชาย ใจดี', 
    phone: '081-234-5678',
    device: 'iPhone 14 Pro', 
    issue: 'หน้าจอแตก', 
    status: 'กำลังซ่อม',
    statusColor: 'bg-primary text-primary-foreground',
    date: '2024-01-15',
    estimatePrice: 4500,
    deposit: 1000,
  },
  { 
    id: 'JOB-002', 
    code: 'REP-2024-002',
    customer: 'วิไล สุขใจ', 
    phone: '082-345-6789',
    device: 'Samsung Galaxy S23', 
    issue: 'แบตเตอรี่เสื่อม', 
    status: 'รออะไหล่',
    statusColor: 'bg-warning text-warning-foreground',
    date: '2024-01-16',
    estimatePrice: 2800,
    deposit: 500,
  },
  { 
    id: 'JOB-003', 
    code: 'REP-2024-003',
    customer: 'ประยุทธ์ มั่นคง', 
    phone: '083-456-7890',
    device: 'iPad Air', 
    issue: 'เปิดไม่ติด', 
    status: 'ตรวจสอบ',
    statusColor: 'bg-secondary text-secondary-foreground',
    date: '2024-01-16',
    estimatePrice: 3500,
    deposit: 0,
  },
  { 
    id: 'JOB-004', 
    code: 'REP-2024-004',
    customer: 'สุภา ดีงาม', 
    phone: '084-567-8901',
    device: 'MacBook Pro', 
    issue: 'คีย์บอร์ดชำรุด', 
    status: 'เสร็จสิ้น',
    statusColor: 'bg-success text-success-foreground',
    date: '2024-01-14',
    estimatePrice: 8900,
    deposit: 3000,
  },
];

export default function Jobs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const filteredJobs = mockJobs.filter(job =>
    job.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.device.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">งานซ่อม</h1>
          <p className="text-muted-foreground">จัดการและติดตามงานซ่อมทั้งหมด</p>
        </div>
        <Button className="gap-2" onClick={() => setCreateDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          เปิดงานใหม่
        </Button>
      </div>

      <CreateJobDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen} 
      />

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>รายการงานซ่อม</CardTitle>
            <div className="flex gap-2">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="ค้นหาเลขที่, ลูกค้า, อุปกรณ์..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>เลขที่</TableHead>
                  <TableHead>ลูกค้า</TableHead>
                  <TableHead>อุปกรณ์</TableHead>
                  <TableHead>อาการ</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>วันที่</TableHead>
                  <TableHead className="text-right">ประเมินราคา</TableHead>
                  <TableHead className="text-right">การกระทำ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job) => (
                  <TableRow key={job.id} className="hover:bg-muted/50">
                    <TableCell>
                      <span className="font-mono font-medium text-primary">{job.code}</span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{job.customer}</p>
                        <p className="text-sm text-muted-foreground">{job.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>{job.device}</TableCell>
                    <TableCell>{job.issue}</TableCell>
                    <TableCell>
                      <Badge className={job.statusColor}>{job.status}</Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(job.date).toLocaleDateString('th-TH', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      ฿{job.estimatePrice.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
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
