import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Eye, FileText } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const mockClaims = [
  {
    id: 'CLM-001',
    refType: 'งานซ่อม',
    refCode: 'REP-2024-001',
    customer: 'สมชาย ใจดี',
    device: 'iPhone 14 Pro',
    issue: 'หน้าจอแตกหลังซ่อม',
    status: 'กำลังดำเนินการ',
    statusColor: 'bg-warning text-warning-foreground',
    date: '2024-01-18',
    estimateCost: 2500,
  },
  {
    id: 'CLM-002',
    refType: 'การขาย',
    refCode: 'SAL-2024-045',
    customer: 'วิไล สุขใจ',
    device: 'Samsung Galaxy S23',
    issue: 'แบตเตอรี่บวม',
    status: 'รอเอกสาร',
    statusColor: 'bg-secondary text-secondary-foreground',
    date: '2024-01-17',
    estimateCost: 1800,
  },
  {
    id: 'CLM-003',
    refType: 'งานซ่อม',
    refCode: 'REP-2024-003',
    customer: 'ประยุทธ์ มั่นคง',
    device: 'iPad Air',
    issue: 'ซ่อมแล้วยังเปิดไม่ติด',
    status: 'อนุมัติแล้ว',
    statusColor: 'bg-success text-success-foreground',
    date: '2024-01-15',
    estimateCost: 3200,
  },
  {
    id: 'CLM-004',
    refType: 'การขาย',
    refCode: 'SAL-2024-032',
    customer: 'สุภา ดีงาม',
    device: 'AirPods Pro',
    issue: 'เสียงข้างซ้ายไม่ดัง',
    status: 'ปฏิเสธ',
    statusColor: 'bg-destructive text-destructive-foreground',
    date: '2024-01-14',
    estimateCost: 0,
  },
];

export default function Claims() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClaims = mockClaims.filter(
    (claim) =>
      claim.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.device.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">เคลม/ประกัน</h1>
          <p className="text-muted-foreground">จัดการเคลมและการรับประกัน</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          เปิดเคลมใหม่
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>รายการเคลม</CardTitle>
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
                  <TableHead>เลขที่เคลม</TableHead>
                  <TableHead>อ้างอิง</TableHead>
                  <TableHead>ลูกค้า</TableHead>
                  <TableHead>อุปกรณ์</TableHead>
                  <TableHead>ปัญหา</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>วันที่</TableHead>
                  <TableHead className="text-right">ประเมินค่าใช้จ่าย</TableHead>
                  <TableHead className="text-right">การกระทำ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClaims.map((claim) => (
                  <TableRow key={claim.id} className="hover:bg-muted/50">
                    <TableCell>
                      <span className="font-mono font-medium text-primary">
                        {claim.id}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm text-muted-foreground">{claim.refType}</p>
                        <p className="font-mono text-sm">{claim.refCode}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{claim.customer}</p>
                    </TableCell>
                    <TableCell>{claim.device}</TableCell>
                    <TableCell>
                      <p className="max-w-[200px] truncate">{claim.issue}</p>
                    </TableCell>
                    <TableCell>
                      <Badge className={claim.statusColor}>{claim.status}</Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(claim.date).toLocaleDateString('th-TH', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      {claim.estimateCost > 0
                        ? `฿${claim.estimateCost.toLocaleString()}`
                        : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
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
