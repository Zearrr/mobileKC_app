import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Bell,
  Palette,
  Printer,
  Save,
  Shield,
  Store,
  Users
} from 'lucide-react';
import { useState } from 'react';

const menu = [
  { key: 'storeInfo',   icon: Store,    label: 'ข้อมูลร้าน' },
  { key: 'manageUsers', icon: Users,    label: 'จัดการผู้ใช้' },
  { key: 'notification',icon: Bell,     label: 'การแจ้งเตือน' },
  { key: 'printer',     icon: Printer,  label: 'การพิมพ์' },
  { key: 'security',    icon: Shield,   label: 'ความปลอดภัย' },
  { key: 'appearance',  icon: Palette,  label: 'การแสดงผล' },
] as const;
type TabKey = typeof menu[number]['key'];

export default function Settings() {
  const [tab, setTab] = useState<TabKey>('storeInfo');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ตั้งค่า</h1>
        <p className="text-muted-foreground">จัดการการตั้งค่าระบบและร้านค้า</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Menu */}
        <div className="space-y-2">
          {menu.map(item => (
            <Button
              key={item.key}
              variant={tab === item.key ? 'default' : 'ghost'}
              className="w-full justify-start gap-2"
              onClick={() => setTab(item.key)}>
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </div>
        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {tab === 'storeInfo' && (
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>ข้อมูลร้าน</CardTitle>
              <CardDescription>
                ข้อมูลร้านค้าจะแสดงในใบเสร็จและเอกสารต่างๆ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shopName">ชื่อร้าน *</Label>
                <Input id="shopName" defaultValue="KODPHONE" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shopPhone">เบอร์โทรศัพท์ *</Label>
                <Input id="shopPhone" defaultValue="0614261817" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shopEmail">อีเมล</Label>
                <Input
                  id="shopEmail"
                  type="email"
                  defaultValue="KODPHONE@gmail.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shopAddress">ที่อยู่ *</Label>
                <Textarea
                  id="shopAddress"
                  rows={3}
                  defaultValue="ต.ขุนทะเล อ.เมือง จ.สุราษฎร์ธานี 84100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxId">เลขประจำตัวผู้เสียภาษี</Label>
                <Input id="taxId" defaultValue="0-1234-56789-01-2" />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="warrantyTerms">เงื่อนไขการรับประกัน</Label>
                <Textarea
                  id="warrantyTerms"
                  rows={4}
                  defaultValue="1. รับประกัน 30 วัน สำหรับงานซ่อมทุกชนิด&#10;2. รับประกัน 90 วัน สำหรับอะไหล่แท้&#10;3. ไม่รับประกันความเสียหายจากการตกกระแทก น้ำเข้า&#10;4. กรุณานำใบรับซ่อมมาทุกครั้งเพื่อรับประกัน"
                />
              </div>

              <Button className="gap-2">
                <Save className="h-4 w-4" />
                บันทึกข้อมูล
              </Button>
            </CardContent>
          </Card>
          )}
          {tab === 'manageUsers' && (
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>จัดการผู้ใช้</CardTitle>
                <CardDescription>เพิ่ม แก้ไข หรือกำจัดบัญชีผู้ใช้ระบบ</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <div className="mb-4 flex justify-end">
                    <DialogTrigger asChild>
                      <Button size="sm">+ เพิ่มผู้ใช้</Button>
                    </DialogTrigger>
                  </div>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>เพิ่มผู้ใช้ใหม่</DialogTitle>
                      <DialogDescription>กรอกข้อมูลผู้ใช้ให้ครบถ้วน</DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4">
                      <div>
                        <Label htmlFor="newUserName">ชื่อ</Label>
                        <Input id="newUserName" />
                      </div>
                      <div>
                        <Label htmlFor="newUserEmail">อีเมล</Label>
                        <Input id="newUserEmail" type="email" />
                      </div>
                      <div>
                        <Label htmlFor="newUserRole">สิทธิ์</Label>
                        <select id="newUserRole" className="w-full border rounded p-2 text-sm">
                          <option value="admin">ผู้ดูแล (admin)</option>
                          <option value="staff">พนักงาน (staff)</option>
                          <option value="finance">การเงิน (finance)</option>
                          <option value="viewer">ผู้ชม (viewer)</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="newUserPassword">รหัสผ่าน</Label>
                        <Input id="newUserPassword" type="password" autoComplete="new-password" />
                      </div>
                      <div>
                        <Label htmlFor="newUserPassword2">ยืนยันรหัสผ่าน</Label>
                        <Input id="newUserPassword2" type="password" autoComplete="new-password" />
                      </div>
                    </form>
                    <DialogFooter>
                      <Button type="submit">บันทึก</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <div className="overflow-x-auto mt-4">
                  <table className="min-w-full text-sm border rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-muted text-left">
                        <th className="p-2 px-3">ชื่อ</th>
                        <th className="p-2 px-3">อีเมล</th>
                        <th className="p-2 px-3">สิทธิ์</th>
                        <th className="p-2 px-3 text-right">การจัดการ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* ตัวอย่างผู้ใช้แต่ละแถว dialog "แก้ไข" อิงข้อมูล mock */}
                      {[
                        {name: 'admin', email: 'admin@fixflow.com', role: 'ผู้ดูแล (admin)', roleValue: 'admin'},
                        {name: 'staff', email: 'staff@fixflow.com', role: 'พนักงาน (staff)', roleValue: 'staff'},
                        {name: 'finance', email: 'finance@fixflow.com', role: 'การเงิน (finance)', roleValue: 'finance'},
                        {name: 'viewer', email: 'viewer@fixflow.com', role: 'ผู้ชม (viewer)', roleValue: 'viewer'}
                      ].map((user, idx) => (
                        <tr className="border-t" key={user.name}>
                          <td className="p-2 px-3">{user.name}</td>
                          <td className="p-2 px-3">{user.email}</td>
                          <td className="p-2 px-3">{user.role}</td>
                          <td className="p-2 px-3 text-right space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" className="mr-2">แก้ไข</Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-md">
                                <DialogHeader>
                                  <DialogTitle>แก้ไขผู้ใช้</DialogTitle>
                                  <DialogDescription>ปรับเปลี่ยนข้อมูลผู้ใช้และสิทธิ์การเข้าถึง</DialogDescription>
                                </DialogHeader>
                                <form className="space-y-4">
                                  <div>
                                    <Label htmlFor={`editUserName_${idx}`}>ชื่อ</Label>
                                    <Input id={`editUserName_${idx}`} defaultValue={user.name} />
                                  </div>
                                  <div>
                                    <Label htmlFor={`editUserEmail_${idx}`}>อีเมล</Label>
                                    <Input id={`editUserEmail_${idx}`} type="email" defaultValue={user.email} />
                                  </div>
                                  <div>
                                    <Label htmlFor={`editUserRole_${idx}`}>สิทธิ์</Label>
                                    <select id={`editUserRole_${idx}`} className="w-full border rounded p-2 text-sm" defaultValue={user.roleValue}>
                                      <option value="admin">ผู้ดูแล (admin)</option>
                                      <option value="staff">พนักงาน (staff)</option>
                                      <option value="finance">การเงิน (finance)</option>
                                      <option value="viewer">ผู้ชม (viewer)</option>
                                    </select>
                                  </div>
                                  <div>
                                    <Label htmlFor={`editUserPassword_${idx}`}>รหัสผ่านใหม่ (ถ้าต้องการเปลี่ยน)</Label>
                                    <Input id={`editUserPassword_${idx}`} type="password" autoComplete="new-password" />
                                  </div>
                                  <div>
                                    <Label htmlFor={`editUserPassword2_${idx}`}>ยืนยันรหัสผ่านใหม่</Label>
                                    <Input id={`editUserPassword2_${idx}`} type="password" autoComplete="new-password" />
                                  </div>
                                </form>
                                <DialogFooter>
                                  <Button type="submit">บันทึก</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <Button size="sm" variant="destructive">ลบ</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* TODO: รองรับ Add/Edit แบบ popup modal ในอนาคต */}
              </CardContent>
            </Card>
          )}
          {tab === 'notification' && (
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>การแจ้งเตือน</CardTitle>
                <CardDescription>ตั้งค่าการแจ้งเตือนสำหรับเหตุการณ์ในระบบที่สำคัญ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                  <div>
                  <Label>แจ้งเตือนงานใหม่</Label>
                    <p className="text-xs text-muted-foreground">เมื่อมีงานซ่อมใหม่เข้ามา</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                  <div>
                  <Label>แจ้งเตือนสต็อกต่ำ</Label>
                    <p className="text-xs text-muted-foreground">เมื่อสินค้าใกล้หมด</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                  <div>
                  <Label>แจ้งเตือนเคลม</Label>
                    <p className="text-xs text-muted-foreground">เมื่อมีการเปิดเคลมใหม่</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                  <div>
                  <Label>แจ้งเตือนทางอีเมล</Label>
                    <p className="text-xs text-muted-foreground">ส่งอีเมลสรุปรายวันสำคัญ</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
          )}
          {tab === 'printer' && (
          <Card className="shadow-sm">
            <CardHeader>
                <CardTitle>การพิมพ์</CardTitle>
                <CardDescription>กำหนดขนาดและรูปแบบการพิมพ์เอกสารจากระบบ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="paperSize">ขนาดกระดาษ</Label>
                  <Input id="paperSize" defaultValue="A4 (210x297 mm)" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="receiptStyle">รูปแบบใบเสร็จ</Label>
                  <select id="receiptStyle" className="w-full border rounded p-2 text-sm">
                    <option value="default">มาตรฐาน (Standard)</option>
                    <option value="simple">เรียบง่าย (Simple)</option>
                    <option value="full">รายละเอียดเต็ม (Full Detail)</option>
                  </select>
                </div>
                <Separator />
              <div className="flex items-center justify-between">
                  <Label>แสดงโลโก้ร้านในใบเสร็จ</Label>
                <Switch defaultChecked />
              </div>
                <Separator />
                <div>
                  <Button size="sm">ทดสอบพิมพ์</Button>
                </div>
              </CardContent>
            </Card>
          )}
          {tab === 'security' && (
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>ความปลอดภัย</CardTitle>
                <CardDescription>ตั้งค่าความปลอดภัยบัญชี และการยืนยันตัวตน</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">เปลี่ยนรหัสผ่าน</h3>
                  <div className="space-y-2 max-w-sm">
                    <Label htmlFor="currentPassword">รหัสผ่านปัจจุบัน</Label>
                    <Input id="currentPassword" type="password" autoComplete="current-password" />
                    <Label htmlFor="newPassword">รหัสผ่านใหม่</Label>
                    <Input id="newPassword" type="password" autoComplete="new-password" />
                    <Label htmlFor="confirmNewPassword">ยืนยันรหัสผ่านใหม่</Label>
                    <Input id="confirmNewPassword" type="password" autoComplete="new-password" />
                    <Button type="button" size="sm" className="mt-2">บันทึกรหัสผ่านใหม่</Button>
                  </div>
                </div>
              <Separator />
              <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">เปิดใช้งานการยืนยันสองขั้นตอน (2FA)</h3>
                    <p className="text-xs text-muted-foreground">เพิ่มความปลอดภัยด้วย OTP ผ่านแอปหรืออีเมลทุกครั้งที่เข้าสู่ระบบ</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div>
                  <Button size="sm" variant="outline">จัดการอุปกรณ์ที่เข้าสู่ระบบ</Button>
                </div>
              </CardContent>
            </Card>
          )}
          {tab === 'appearance' && (
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>การแสดงผล</CardTitle>
                <CardDescription>ปรับธีม โหมดแสง/มืด และสีหลักของระบบ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="mb-2 block">ธีมระบบ</Label>
                  <div className="flex items-center gap-4">
                    <Button size="sm" variant="outline">แสง (Light)</Button>
                    <Button size="sm" variant="outline">มืด (Dark)</Button>
                    <Button size="sm" variant="default">อัตโนมัติ (Auto)</Button>
                  </div>
                </div>
                <Separator />
                <div>
                  <Label className="mb-2 block">สีหลักระบบ</Label>
                  <div className="flex items-center gap-3">
                    <button className="w-7 h-7 rounded-full border-2 border-primary shadow bg-blue-600" title="น้ำเงิน" />
                    <button className="w-7 h-7 rounded-full border shadow bg-green-500" title="เขียว" />
                    <button className="w-7 h-7 rounded-full border shadow bg-red-500" title="แดง" />
                    <button className="w-7 h-7 rounded-full border shadow bg-pink-500" title="ชมพู" />
                </div>
              </div>
              <Separator />
                <div>
                  <Label className="mb-2 block">ตัวอย่างการแสดงผล</Label>
                  <div className="bg-muted p-4 rounded">
                    <div className="font-bold text-primary mb-1">PRIMARY TITLE</div>
                    <div className="text-muted-foreground">นี่คือตัวอย่างข้อความในหน้าระบบ</div>
                  </div>
                </div>
                <div>
                  <Button size="sm" className="mt-2">บันทึกการตั้งค่า</Button>
              </div>
            </CardContent>
          </Card>
          )}
        </div>
      </div>
    </div>
  );
}
