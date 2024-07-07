import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'react-hot-toast';
import { User, Mail, Key, UserPlus } from 'lucide-react';

interface StaffMember {
  id: string;
  fullName: string;
  userName: string;
  email: string;
}

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStaff: (newStaff: StaffMember) => void;
}

const AddStaffModal: React.FC<AddStaffModalProps> = ({ isOpen, onClose, onAddStaff }) => {
  const [formData, setFormData] = useState({
    id: '',
    fullName: '',
    userName: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://milkapplication20240705013352.azurewebsites.net/api/Users/CreateStaff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newStaff: StaffMember = {
          id: formData.id,
          fullName: formData.fullName,
          userName: formData.userName,
          email: formData.email,
        };
        onAddStaff(newStaff);
        toast.success('Nhân viên mới đã được thêm thành công!');
        onClose();
      } else {
        toast.error('Không thể tạo nhân viên. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Error creating staff:', error);
      toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex items-center justify-between">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <UserPlus className="w-6 h-6" />
            Thêm Nhân Viên Mới
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="id" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              ID
            </Label>
            <Input 
              id="id" 
              name="id" 
              value={formData.id} 
              onChange={handleChange} 
              required 
              className="pl-8"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fullName" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Họ và Tên
            </Label>
            <Input 
              id="fullName" 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleChange} 
              required 
              className="pl-8"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="userName" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Tên đăng nhập
            </Label>
            <Input 
              id="userName" 
              name="userName" 
              value={formData.userName} 
              onChange={handleChange} 
              required 
              className="pl-8"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              className="pl-8"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Key className="w-4 h-4" />
              Mật khẩu
            </Label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              className="pl-8"
            />
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full flex items-center justify-center gap-2">
              <UserPlus className="w-5 h-5" />
              Thêm Nhân Viên
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStaffModal;