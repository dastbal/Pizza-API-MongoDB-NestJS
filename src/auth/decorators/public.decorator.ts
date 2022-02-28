import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

export  const Public = () => SetMetadata(IS_PUBLIC_KEY,true);
