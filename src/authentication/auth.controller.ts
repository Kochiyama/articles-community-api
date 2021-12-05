import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalGuard } from 'src/common/guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async create(@Request() req: any) {
    return this.authService.generateToken(req.user);
  }
}
