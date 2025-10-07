import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowUpCircle,
  ArrowDownCircle,
  DollarSign,
  TrendingUp,
  Calendar,
  Download,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const mockTransactions = [
  {
    id: 'TXN-001',
    type: 'income',
    category: 'งานซ่อม',
    description: 'ซ่อมหน้าจอ iPhone 14 Pro',
    amount: 4500,
    date: '2024-01-20',
    ref: 'JOB-001',
  },
  {
    id: 'TXN-002',
    type: 'income',
    category: 'ขายสินค้า',
    description: 'ขายเคส iPhone',
    amount: 450,
    date: '2024-01-20',
    ref: 'SAL-045',
  },
  {
    id: 'TXN-003',
    type: 'expense',
    category: 'ซื้อสต็อก',
    description: 'ซื้อหน้าจอ Samsung S23',
    amount: 1800,
    date: '2024-01-19',
    ref: 'PO-012',
  },
  {
    id: 'TXN-004',
    type: 'income',
    category: 'งานซ่อม',
    description: 'เปลี่ยนแบตเตอรี่ iPad',
    amount: 2800,
    date: '2024-01-19',
    ref: 'JOB-003',
  },
  {
    id: 'TXN-005',
    type: 'expense',
    category: 'ค่าใช้จ่าย',
    description: 'ค่าไฟฟ้าประจำเดือน',
    amount: 3500,
    date: '2024-01-18',
    ref: 'EXP-008',
  },
];

export default function Finance() {
  const totalIncome = mockTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = mockTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalIncome - totalExpense;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">การเงิน</h1>
          <p className="text-muted-foreground">จัดการรายรับ-รายจ่ายและรายงาน</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            เลือกช่วงเวลา
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            ส่งออกรายงาน
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">รายรับทั้งหมด</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              ฿{totalIncome.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              จากงานซ่อมและการขาย
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">รายจ่ายทั้งหมด</CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              ฿{totalExpense.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              ค่าสต็อกและค่าใช้จ่าย
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">กำไรสุทธิ</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              ฿{netProfit.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              รายรับ - รายจ่าย
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Transaction List */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>รายการเคลื่อนไหวล่าสุด</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>เลขที่</TableHead>
                  <TableHead>ประเภท</TableHead>
                  <TableHead>หมวดหมู่</TableHead>
                  <TableHead>รายละเอียด</TableHead>
                  <TableHead>อ้างอิง</TableHead>
                  <TableHead>วันที่</TableHead>
                  <TableHead className="text-right">จำนวนเงิน</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransactions.map((txn) => (
                  <TableRow key={txn.id} className="hover:bg-muted/50">
                    <TableCell>
                      <span className="font-mono text-sm">{txn.id}</span>
                    </TableCell>
                    <TableCell>
                      {txn.type === 'income' ? (
                        <Badge className="bg-success text-success-foreground">
                          รายรับ
                        </Badge>
                      ) : (
                        <Badge className="bg-destructive text-destructive-foreground">
                          รายจ่าย
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{txn.category}</TableCell>
                    <TableCell>{txn.description}</TableCell>
                    <TableCell>
                      <span className="font-mono text-sm text-muted-foreground">
                        {txn.ref}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(txn.date).toLocaleDateString('th-TH', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={
                          txn.type === 'income'
                            ? 'text-success font-medium'
                            : 'text-destructive font-medium'
                        }
                      >
                        {txn.type === 'income' ? '+' : '-'}฿
                        {txn.amount.toLocaleString()}
                      </span>
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
