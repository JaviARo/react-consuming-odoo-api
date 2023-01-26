# -*- coding: utf-8 -*-

from odoo import models, fields, api


class bicycles(models.Model):
    _name = 'bicycles.bicycles'
    _description = 'bicycles.bicycles'

    name = fields.Char()
    brand = fields.Char()
    model = fields.Char()
#     value2 = fields.Float(compute="_value_pc", store=True)
#     description = fields.Text()
#
#     @api.depends('value')
#     def _value_pc(self):
#         for record in self:
#             record.value2 = float(record.value) / 100
